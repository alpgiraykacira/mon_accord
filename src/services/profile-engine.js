// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Olfactory Profile Engine
// ═══════════════════════════════════════════════════════════════

import { generateAIResponse } from './ai-engine.js';
import { storage } from '../utils/storage.js';
import { PERFUMES, SCENT_FAMILIES, ARCHETYPES, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';

export async function generateProfile(quizAnswers) {
  const prompt = buildProfilePrompt(quizAnswers);
  const response = await generateAIResponse(prompt);

  if (response.success) {
    const profile = parseProfileResponse(response.text, quizAnswers);
    storage.setProfile(profile);
    storage.addInteraction({ type: 'profile-created', profile: profile.archetype });
    return { success: true, profile };
  }
  return { success: false, error: response.text };
}

function buildProfilePrompt(answers) {
  const selectedFamilies = answers.scentFamilies?.join(', ') || 'not specified';
  const selectedPerfumes = (answers.knownPerfumes || [])
    .map(id => {
      const p = LOREAL_LUXE_PERFUMES.find(lp => lp.id === id);
      return p ? `${p.brand} ${p.name} (${p.family})` : id;
    })
    .join(', ') || 'none selected';

  const regions = answers.interestedRegions?.join(', ') || 'all regions';

  return `Analyze this user's fragrance preferences and create their olfactory profile.

USER QUIZ ANSWERS:
- Preferred scent families: ${selectedFamilies}
- Perfumes they currently wear/enjoy: ${selectedPerfumes}
- Sillage preference (1-10): ${answers.sillage || 5}
- Longevity preference (1-10): ${answers.longevity || 5}
- Intensity preference (1-10): ${answers.intensity || 5}
- Interested regions: ${regions}
- Daily context: ${answers.context || 'versatile'}
- Additional notes: ${answers.notes || 'none'}

Please respond in EXACTLY this JSON format (no markdown, no code blocks, just pure JSON):
{
  "archetype": "one of: warm-oriental, fresh-aquatic, floral-romantic, woody-earthy, citrus-bright, gourmand-cozy",
  "archetypeName": "human-readable name",
  "description": "A 2-3 sentence poetic description of their scent identity",
  "primaryFamilies": ["top 2-3 scent families"],
  "sillageProfile": "low/medium/high",
  "notePreferences": {
    "loves": ["3-5 note types they'd love"],
    "explore": ["2-3 notes to explore"],
    "avoid": ["1-2 notes to avoid"]
  },
  "recommendedRegions": ["top 2-3 Mon Accord regions for them"],
  "signatureBlend": {
    "description": "A vivid sensory description of their ideal scent",
    "layers": [
      {"perfumeId": "id from our collection", "amount": 2, "unit": "sprays or drops"}
    ]
  }
}`;
}

function parseProfileResponse(text, answers) {
  try {
    // Clean potential markdown wrapping
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }
    const parsed = JSON.parse(cleaned);
    return {
      ...parsed,
      createdAt: Date.now(),
      quizAnswers: answers,
    };
  } catch (e) {
    console.error('Failed to parse profile JSON:', e);
    // Fallback: create a basic profile from quiz answers
    return createFallbackProfile(answers);
  }
}

function createFallbackProfile(answers) {
  const families = answers.scentFamilies || ['woody'];
  let archetype = 'woody-earthy';
  if (families.includes('oriental') || families.includes('spicy')) archetype = 'warm-oriental';
  else if (families.includes('fresh') || families.includes('citrus')) archetype = 'fresh-aquatic';
  else if (families.includes('floral')) archetype = 'floral-romantic';
  else if (families.includes('gourmand')) archetype = 'gourmand-cozy';

  const archetypeData = ARCHETYPES.find(a => a.id === archetype) || ARCHETYPES[0];

  return {
    archetype,
    archetypeName: archetypeData.name,
    description: archetypeData.description,
    primaryFamilies: families.slice(0, 3),
    sillageProfile: answers.sillage > 7 ? 'high' : answers.sillage > 4 ? 'medium' : 'low',
    notePreferences: { loves: [], explore: [], avoid: [] },
    recommendedRegions: answers.interestedRegions || ['mediterranean', 'eastasia'],
    signatureBlend: null,
    createdAt: Date.now(),
    quizAnswers: answers,
  };
}

export async function generateScentSimulation(layers) {
  const layerDescriptions = layers.map(l => {
    const p = PERFUMES.find(pf => pf.id === l.perfumeId);
    if (!p) return '';
    return `${l.amount} ${l.unit} of ${p.name} (Top: ${p.topNotes.join(', ')}; Mid: ${p.middleNotes.join(', ')}; Base: ${p.baseNotes.join(', ')})`;
  }).filter(Boolean).join('\n');

  const prompt = `You are simulating the scent experience of this fragrance combination. Describe what the wearer would smell in three temporal phases.

FORMULA:
${layerDescriptions}

Respond with a vivid, sensory text description in this format:

OPENING (first 15 minutes): [describe the initial burst]
HEART (30 min - 2 hours): [describe the middle development]
DRY DOWN (2+ hours): [describe the lasting base]
OVERALL CHARACTER: [one-sentence summary of the blend's personality]
SILLAGE & LONGEVITY: [brief assessment]

Be poetic but precise. Help the reader "smell" this blend through words. Keep it under 200 words total.`;

  const response = await generateAIResponse(prompt);
  return response;
}
