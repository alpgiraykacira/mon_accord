// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Contextual Advisor
// ═══════════════════════════════════════════════════════════════

import { generateAIResponse } from './ai-engine.js';
import { storage } from '../utils/storage.js';
import { PERFUMES, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';

export const MOODS = [
  { id: 'confident', name: 'Confident', icon: '', description: 'Bold and commanding' },
  { id: 'romantic', name: 'Romantic', icon: '', description: 'Soft and alluring' },
  { id: 'calm', name: 'Calm', icon: '', description: 'Peaceful and centered' },
  { id: 'energetic', name: 'Energetic', icon: '', description: 'Vibrant and lively' },
  { id: 'mysterious', name: 'Mysterious', icon: '', description: 'Enigmatic and deep' },
  { id: 'playful', name: 'Playful', icon: '', description: 'Light and fun' },
];

export const OCCASIONS = [
  { id: 'office', name: 'Office / Work', icon: '' },
  { id: 'date-night', name: 'Date Night', icon: '' },
  { id: 'casual', name: 'Casual Outing', icon: '' },
  { id: 'formal', name: 'Formal Event', icon: '' },
  { id: 'outdoor', name: 'Outdoor Adventure', icon: '' },
  { id: 'cozy', name: 'Cozy Night In', icon: '' },
];

export const SEASONS = [
  { id: 'spring', name: 'Spring', icon: '' },
  { id: 'summer', name: 'Summer', icon: '' },
  { id: 'autumn', name: 'Autumn', icon: '' },
  { id: 'winter', name: 'Winter', icon: '' },
];

export const INTENSITIES = [
  { id: 'whisper', name: 'Whisper', value: 1, description: 'Barely there, intimate' },
  { id: 'soft', name: 'Soft', value: 3, description: 'Close range only' },
  { id: 'moderate', name: 'Moderate', value: 5, description: 'Noticeable arm\'s length' },
  { id: 'present', name: 'Present', value: 7, description: 'Fills the room gently' },
  { id: 'bold', name: 'Bold', value: 9, description: 'Leaves a trail' },
];

function buildOwnedContext() {
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
  return lines.length ? lines.join('\n') : null;
}

export async function getContextualRecommendation(context) {
  const profile = storage.getProfile();
  const ownedContext = buildOwnedContext();

  const prompt = `Based on the user's context, recommend a Mon Accord layering formula.

USER PROFILE: ${profile ? `Archetype: ${profile.archetypeName}, Preferred families: ${profile.primaryFamilies?.join(', ')}, Sillage: ${profile.sillageProfile}` : 'No profile yet — make a versatile recommendation.'}

${ownedContext ? `USER'S OWNED PERFUMES (prioritize recommendations that use or complement these):
${ownedContext}

` : ''}CURRENT CONTEXT:
- Mood: ${context.mood || 'not specified'}
- Occasion: ${context.occasion || 'not specified'}
- Season: ${context.season || 'not specified'}
- Time of day: ${context.timeOfDay || 'not specified'}
- Desired intensity: ${context.intensity || 'moderate'}

Available perfumes (use exact IDs):
${PERFUMES.map(p => `- ${p.id}: ${p.name} (${p.scentFamily}, sillage: ${p.sillage}/10)`).join('\n')}

Respond in EXACTLY this JSON format (no markdown, no code blocks):
{
  "formulaName": "creative name for this blend",
  "layers": [
    {"perfumeId": "exact-id", "amount": 2, "unit": "sprays or drops"}
  ],
  "reasoning": "2-3 sentences explaining why this blend works for the given context",
  "scentPreview": "A vivid 2-sentence sensory description of what this will smell like",
  "tips": "One practical application tip"
}`;

  const response = await generateAIResponse(prompt, 2, 400); // actual ~189 tokens

  if (response.success) {
    try {
      let cleaned = response.text.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      const recommendation = JSON.parse(cleaned);
      storage.addInteraction({ type: 'contextual-recommendation', context, recommendation: recommendation.formulaName });
      return { success: true, recommendation };
    } catch (e) {
      console.error('Failed to parse recommendation:', e);
      return { success: true, recommendation: { formulaName: 'Your Recommendation', layers: [], reasoning: response.text, scentPreview: '', tips: '' } };
    }
  }

  // ── Fallback: AI unavailable or network error — return a curated preset ──
  return { success: true, recommendation: buildFallbackRecommendation(context) };
}

function buildFallbackRecommendation(context) {
  const mood     = context?.mood      || '';
  const occasion = context?.occasion  || '';
  const season   = context?.season    || '';

  // Pick a preset based on contextual cues
  const isWarm    = ['romantic','confident','mysterious'].includes(mood) || ['date-night','formal'].includes(occasion) || ['autumn','winter'].includes(season);
  const isFresh   = ['energetic','playful','calm'].includes(mood)        || ['outdoor','casual'].includes(occasion)    || ['spring','summer'].includes(season);

  if (isWarm) {
    return {
      formulaName: 'Golden Dusk',
      layers: [
        { perfumeId: 'middleeast-spray',    amount: 3, unit: 'sprays' },
        { perfumeId: 'mediterranean-spray', amount: 2, unit: 'sprays' },
        { perfumeId: 'southamerica-oil',    amount: 2, unit: 'drops'  },
      ],
      reasoning: 'A warm, opulent formula built for evenings and intimate occasions. The Middle Eastern spray leads with oud and rose, anchored by a South American oil that adds lasting depth.',
      scentPreview: 'Opens with a confident burst of oud and saffron; dries down to warm tonka and vetiver — rich, memorable, unmistakably present.',
      tips: 'Apply the oil first to clean, moisturised skin for maximum longevity, then spray from 20 cm.',
    };
  }
  if (isFresh) {
    return {
      formulaName: 'Morning Clarity',
      layers: [
        { perfumeId: 'scandinavian-spray',  amount: 3, unit: 'sprays' },
        { perfumeId: 'mediterranean-spray', amount: 2, unit: 'sprays' },
        { perfumeId: 'eastasia-oil',        amount: 2, unit: 'drops'  },
      ],
      reasoning: 'A crisp, uplifting blend ideal for daytime and outdoor settings. Nordic freshness pairs with Mediterranean citrus, while the East Asian oil adds quiet complexity.',
      scentPreview: 'A burst of bergamot and cool pine opens the blend; white tea and green notes settle into a clean, skin-close finish.',
      tips: 'Best applied right after a shower — the warmth of your skin activates the citrus top notes immediately.',
    };
  }
  // Neutral default
  return {
    formulaName: 'Signature Accord',
    layers: [
      { perfumeId: 'scandinavian-spray',  amount: 2, unit: 'sprays' },
      { perfumeId: 'middleeast-spray',    amount: 2, unit: 'sprays' },
      { perfumeId: 'mediterranean-spray', amount: 1, unit: 'sprays' },
      { perfumeId: 'eastasia-oil',        amount: 2, unit: 'drops'  },
    ],
    reasoning: 'A balanced, all-occasion formula that bridges freshness and depth. Each region contributes a distinct character while remaining harmonious as a whole.',
    scentPreview: 'Fresh Nordic air over a warm Eastern heart — versatile enough for day or night, understated enough to never overwhelm.',
    tips: 'Layer the oil on pulse points first, then apply sprays starting from the heaviest to lightest sillage.',
  };
}
