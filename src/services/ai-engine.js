// ═══════════════════════════════════════════════════════════════
// MON ACCORD — AI Engine (Gemini API Integration)
// Uses @google/genai SDK
// ═══════════════════════════════════════════════════════════════

import { GoogleGenAI } from '@google/genai';
import { storage } from '../utils/storage.js';

let ai = null;

const SYSTEM_INSTRUCTION = `You are Mon Accord's AI Perfume Advisor — a world-class fragrance expert specializing in scent layering and olfactory profiling.

You work with Mon Accord's exclusive collection of 12 perfumes from 6 world regions:
- Scandinavian (Spray & Oil): Pine, moss, ice, white tea, birch, cedar
- East Asia (Spray & Oil): Sakura, green tea, bamboo, shiso, hinoki, rice
- South Africa (Spray & Oil): Rooibos, fynbos, earth, vanilla, coffee
- Mediterranean (Spray & Oil): Lemon, bergamot, orange blossom, fig, olive blossom, lavender
- South America (Spray & Oil): Tonka, cocoa, vetiver, tropical green, palo santo
- Middle East (Spray & Oil): Oud, rose, saffron, musk, frankincense

Key knowledge:
- Sprays project more (higher sillage) but less longevity. Oils are intimate but last longer.
- Layering = combining multiple sprays and oils. Oil goes on pulse points first, spray over.
- Amounts are in "sprays" for spray format and "drops" for oil format.
- A formula is a list of perfumes with their amounts (e.g., "2 sprays Mediterranean + 3 drops Middle East Oil").

Your tone: Sophisticated, warm, poetic but precise. Like a knowledgeable friend at a luxury fragrance house.
Always respond in English.
When describing scents, be vivid and sensory — help the user "smell" through words.
Keep responses concise but rich. Use fragrance terminology naturally.`;

function initializeAI() {
  const apiKey = storage.getApiKey();
  if (!apiKey) return false;
  try {
    ai = new GoogleGenAI({ apiKey });
    return true;
  } catch (e) {
    console.error('Failed to initialize Gemini:', e);
    return false;
  }
}

/**
 * Generate an AI response with automatic retry on rate limit.
 * @param {string} prompt
 * @param {number} retries - number of remaining retries
 */
export async function generateAIResponse(prompt, retries = 2) {
  if (!ai && !initializeAI()) {
    return { success: false, error: 'no-api-key', text: 'Please set your Gemini API key in Settings to enable AI features.' };
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    const text = response.text;
    if (!text) {
      console.error('Empty response from Gemini');
      return { success: false, error: 'empty-response', text: 'AI returned an empty response. Please try again.' };
    }
    return { success: true, text };
  } catch (e) {
    const msg = e.message || String(e);
    console.error('AI generation error:', msg);

    // Rate limit — extract wait time and auto-retry
    if (msg.includes('429') || msg.includes('quota') || msg.includes('rate') || msg.includes('RESOURCE_EXHAUSTED')) {
      const waitMatch = msg.match(/retry in (\d+)/i) || msg.match(/retryDelay.*?(\d+)/);
      const waitSec = waitMatch ? parseInt(waitMatch[1]) : 30;

      if (retries > 0) {
        console.log(`Rate limited. Waiting ${waitSec}s before retry... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, (waitSec + 2) * 1000));
        return generateAIResponse(prompt, retries - 1);
      }

      return {
        success: false,
        error: 'rate-limit',
        text: `Rate limit exceeded. The free tier has per-minute and daily limits. Please wait ${waitSec} seconds and try again, or check your quota at ai.google.dev.`
      };
    }

    // Invalid API key
    if (msg.includes('API_KEY') || msg.includes('API key') || msg.includes('401') || msg.includes('403')) {
      ai = null; // Reset so it re-initializes with new key
      return { success: false, error: 'invalid-key', text: 'Invalid API key. Please check your Gemini API key in Settings.' };
    }

    // Network error
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('ECONNREFUSED')) {
      return { success: false, error: 'network', text: 'Network error. Please check your internet connection and try again.' };
    }

    return { success: false, error: 'generation-failed', text: `AI generation failed: ${msg.slice(0, 200)}` };
  }
}

export function isAIAvailable() {
  return !!storage.getApiKey();
}

export function resetAI() {
  ai = null;
}

export { initializeAI };
