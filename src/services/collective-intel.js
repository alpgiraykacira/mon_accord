// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Collective Intelligence
// ═══════════════════════════════════════════════════════════════

import { generateAIResponse } from './ai-engine.js';
import { storage } from '../utils/storage.js';
import { COMMUNITY_FORMULAS, PERFUMES } from '../data/perfumes.js';

export function getTopFormulas(limit = 5) {
  const allFormulas = [...COMMUNITY_FORMULAS, ...getUserSharedFormulas()];
  return allFormulas
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, limit);
}

export function getFormulasByContext(context, limit = 5) {
  const allFormulas = [...COMMUNITY_FORMULAS, ...getUserSharedFormulas()];
  return allFormulas
    .filter(f => f.context === context || f.tags?.includes(context))
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, limit);
}

export function getSimilarProfileFormulas(limit = 5) {
  const profile = storage.getProfile();
  if (!profile) return getTopFormulas(limit);

  const allFormulas = [...COMMUNITY_FORMULAS, ...getUserSharedFormulas()];
  const userFamilies = profile.primaryFamilies || [];

  // Score formulas based on profile similarity
  const scored = allFormulas.map(formula => {
    let score = formula.likes || 0;

    // Boost formulas whose perfumes match user's preferred families
    formula.layers.forEach(layer => {
      const perfume = PERFUMES.find(p => p.id === layer.perfumeId);
      if (perfume) {
        const family = perfume.scentFamily.split('-');
        family.forEach(f => {
          if (userFamilies.includes(f)) score += 50;
        });
      }
    });

    // Boost formulas from recommended regions
    if (profile.recommendedRegions) {
      formula.layers.forEach(layer => {
        const perfume = PERFUMES.find(p => p.id === layer.perfumeId);
        if (perfume && profile.recommendedRegions.includes(perfume.region)) {
          score += 30;
        }
      });
    }

    return { ...formula, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function getUserSharedFormulas() {
  const vault = storage.getVault();
  return vault
    .filter(f => f.shared)
    .map(f => ({ ...f, likes: f.likes || 0, saves: f.saves || 0 }));
}

export async function explainFormula(formula) {
  const profile = storage.getProfile();
  const layerDescriptions = formula.layers.map(l => {
    const p = PERFUMES.find(pf => pf.id === l.perfumeId);
    return p ? `${l.amount} ${l.unit} of ${p.name}` : '';
  }).filter(Boolean).join(' + ');

  const prompt = `A user with ${profile ? `a "${profile.archetypeName}" profile (prefers: ${profile.primaryFamilies?.join(', ')})` : 'no set profile'} is viewing this community formula:

Formula: "${formula.name}"
Layers: ${layerDescriptions}
Context: ${formula.context || 'versatile'}
Community rating: ${formula.likes || 0} likes

Explain in 2-3 sentences why this formula would (or wouldn't) work for them. Be specific about scent chemistry. Keep it warm and encouraging.`;

  return generateAIResponse(prompt);
}

export function getTrendingCombinations() {
  const interactions = storage.getInteractions();
  const recentLikes = interactions
    .filter(i => i.type === 'like' && i.timestamp > Date.now() - 30 * 24 * 60 * 60 * 1000);

  const formulaCounts = {};
  recentLikes.forEach(i => {
    formulaCounts[i.formulaId] = (formulaCounts[i.formulaId] || 0) + 1;
  });

  // Also factor in community data
  return COMMUNITY_FORMULAS
    .sort((a, b) => (b.likes + (formulaCounts[b.id] || 0) * 10) - (a.likes + (formulaCounts[a.id] || 0) * 10))
    .slice(0, 10);
}
