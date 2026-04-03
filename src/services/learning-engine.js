// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Continuous Learning Engine
// ═══════════════════════════════════════════════════════════════

import { generateAIResponse } from './ai-engine.js';
import { storage } from '../utils/storage.js';
import { PERFUMES, REGIONS, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';

export function getUserTrends() {
  const interactions = storage.getInteractions();
  const vault = storage.getVault();
  const likes = storage.getLikes();
  const profile = storage.getProfile();

  if (interactions.length === 0 && vault.length === 0) {
    return null;
  }

  // Analyze region usage frequency
  const regionCounts = {};
  const formatCounts = { spray: 0, oil: 0 };
  const allLayers = [];

  vault.forEach(formula => {
    (formula.layers || []).forEach(layer => {
      const perfume = PERFUMES.find(p => p.id === layer.perfumeId);
      if (perfume) {
        regionCounts[perfume.region] = (regionCounts[perfume.region] || 0) + 1;
        formatCounts[perfume.format]++;
        allLayers.push({ ...layer, region: perfume.region, format: perfume.format, family: perfume.scentFamily });
      }
    });
  });

  // Sort regions by usage
  const topRegions = Object.entries(regionCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([region, count]) => ({ region, count, data: REGIONS.find(r => r.id === region) }));

  // Analyze time-based trends
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const recentInteractions = interactions.filter(i => i.timestamp > thirtyDaysAgo);
  const olderInteractions = interactions.filter(i => i.timestamp <= thirtyDaysAgo);

  // Calculate engagement metrics
  const totalSaves = vault.length;
  const totalLikes = likes.length;
  const recentSaves = vault.filter(f => f.savedAt > thirtyDaysAgo).length;

  return {
    topRegions,
    formatPreference: formatCounts.spray > formatCounts.oil ? 'spray-dominant' : formatCounts.oil > formatCounts.spray ? 'oil-dominant' : 'balanced',
    totalFormulas: vault.length,
    totalLikes,
    recentActivity: recentInteractions.length,
    engagementLevel: recentInteractions.length > 10 ? 'high' : recentInteractions.length > 3 ? 'medium' : 'low',
    profile,
    recentSaves,
  };
}

function buildOwnedSummary() {
  const owned = storage.getOwnedPerfumes();
  const lines = [];
  if (owned.monAccord?.length) {
    const names = owned.monAccord.map(id => PERFUMES.find(p => p.id === id)?.name).filter(Boolean);
    if (names.length) lines.push(`Mon Accord owned: ${names.join(', ')}`);
  }
  if (owned.loreal?.length) {
    const names = owned.loreal.map(id => LOREAL_LUXE_PERFUMES.find(p => p.id === id)?.name).filter(Boolean);
    if (names.length) lines.push(`L'Oréal Luxe owned: ${names.join(', ')}`);
  }
  return lines.length ? lines.join('\n') : 'No owned perfumes registered.';
}

export async function generateRemixSuggestion() {
  const trends = getUserTrends();
  const vault = storage.getVault();
  const profile = storage.getProfile();

  if (!vault.length && !profile) {
    return { success: false, error: 'No usage data yet. Create some formulas first!' };
  }

  const favoriteFormulas = vault
    .slice(0, 3)
    .map(f => {
      const layers = (f.layers || []).map(l => {
        const p = PERFUMES.find(pf => pf.id === l.perfumeId);
        return p ? `${l.amount} ${l.unit} ${p.name}` : '';
      }).filter(Boolean).join(' + ');
      return `"${f.name}": ${layers}`;
    })
    .join('\n');

  const prompt = `Based on this user's fragrance journey, suggest a fresh remix.

USER PROFILE: ${profile ? `${profile.archetypeName} (${profile.primaryFamilies?.join(', ')})` : 'No formal profile'}

USER'S OWNED PERFUMES (these are their starting point — prioritize combinations using these):
${buildOwnedSummary()}

FAVORITE FORMULAS:
${favoriteFormulas || 'None saved yet'}

USAGE TRENDS:
- Most used regions: ${trends?.topRegions?.map(r => r.region).join(', ') || 'not enough data'}
- Format preference: ${trends?.formatPreference || 'balanced'}
- Total formulas: ${trends?.totalFormulas || 0}
- Engagement: ${trends?.engagementLevel || 'new user'}

TASK: Suggest a remix that:
1. Incorporates their favorites but adds something new
2. Introduces a region they haven't explored much
3. Pushes their comfort zone slightly

Respond in EXACTLY this JSON format (no markdown, no code blocks):
{
  "remixName": "creative name",
  "layers": [
    {"perfumeId": "exact-perfume-id", "amount": 2, "unit": "sprays or drops"}
  ],
  "inspiration": "What inspired this remix — connect to their journey",
  "newElement": "What's new/different about this compared to their usual",
  "scentDescription": "Vivid 2-sentence sensory preview"
}`;

  const response = await generateAIResponse(prompt);

  if (response.success) {
    try {
      let cleaned = response.text.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      const remix = JSON.parse(cleaned);
      storage.addInteraction({ type: 'remix-generated', name: remix.remixName });
      return { success: true, remix };
    } catch {
      return { success: true, remix: { remixName: 'AI Remix', layers: [], inspiration: response.text, newElement: '', scentDescription: '' } };
    }
  }
  return { success: false, error: response.text };
}

export function getProfileEvolution() {
  const profile = storage.getProfile();
  const interactions = storage.getInteractions();
  const vault = storage.getVault();

  if (!profile) return null;

  // Build timeline
  const timeline = [];

  // Profile creation
  if (profile.createdAt) {
    timeline.push({
      type: 'profile-created',
      date: profile.createdAt,
      label: 'Profile Created',
      detail: `Archetype: ${profile.archetypeName}`,
    });
  }

  // Formula saves
  vault.forEach(f => {
    timeline.push({
      type: 'formula-saved',
      date: f.savedAt,
      label: `Saved "${f.name}"`,
      detail: `${f.layers?.length || 0} layers`,
    });
  });

  // Sort by date
  timeline.sort((a, b) => a.date - b.date);

  return {
    timeline,
    currentArchetype: profile.archetypeName,
    totalExplorations: vault.length + interactions.filter(i => i.type === 'like').length,
    daysSinceStart: profile.createdAt ? Math.floor((Date.now() - profile.createdAt) / (24 * 60 * 60 * 1000)) : 0,
  };
}
