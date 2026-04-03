// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Contextual Advisor
// ═══════════════════════════════════════════════════════════════

import { generateAIResponse } from './ai-engine.js';
import { storage } from '../utils/storage.js';
import { PERFUMES, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';

export const MOODS = [
  { id: 'confident', name: 'Confident', icon: '💪', description: 'Bold and commanding' },
  { id: 'romantic', name: 'Romantic', icon: '💕', description: 'Soft and alluring' },
  { id: 'calm', name: 'Calm', icon: '🧘', description: 'Peaceful and centered' },
  { id: 'energetic', name: 'Energetic', icon: '⚡', description: 'Vibrant and lively' },
  { id: 'mysterious', name: 'Mysterious', icon: '🌙', description: 'Enigmatic and deep' },
  { id: 'playful', name: 'Playful', icon: '✨', description: 'Light and fun' },
];

export const OCCASIONS = [
  { id: 'office', name: 'Office / Work', icon: '💼' },
  { id: 'date-night', name: 'Date Night', icon: '🕯' },
  { id: 'casual', name: 'Casual Outing', icon: '☀️' },
  { id: 'formal', name: 'Formal Event', icon: '🎩' },
  { id: 'outdoor', name: 'Outdoor Adventure', icon: '🏔' },
  { id: 'cozy', name: 'Cozy Night In', icon: '🛋' },
];

export const SEASONS = [
  { id: 'spring', name: 'Spring', icon: '🌸' },
  { id: 'summer', name: 'Summer', icon: '☀️' },
  { id: 'autumn', name: 'Autumn', icon: '🍂' },
  { id: 'winter', name: 'Winter', icon: '❄️' },
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

  const response = await generateAIResponse(prompt);

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
      return { success: true, recommendation: { formulaName: 'AI Recommendation', layers: [], reasoning: response.text, scentPreview: '', tips: '' } };
    }
  }
  return { success: false, error: response.text };
}
