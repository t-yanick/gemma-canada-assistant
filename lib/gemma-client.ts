// lib/gemma-client.ts
// Thin wrapper around OpenRouter's chat completions endpoint for Gemma 4.
//
// Why a wrapper:
// - Centralizes the fetch logic so each API route does not repeat error handling.
// - Makes it trivial to add a second AI feature later (POF analyzer, visitor visa
//   home ties checker, etc.) - they reuse this same client.
// - Gives one place to swap models, tune temperature, or add streaming support
//   in the future.

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemma-4-31b-it:free';
const DEFAULT_TEMPERATURE = 0.4;

export interface GemmaCallOptions {
  systemPrompt: string;
  userMessage: string;
  model?: string;
  temperature?: number;
  jsonMode?: boolean;
}

export interface GemmaCallResult {
  ok: true;
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GemmaCallError {
  ok: false;
  status: number;
  error: string;
  details?: unknown;
}

/**
 * Call Gemma via OpenRouter with a system prompt and user message.
 *
 * Returns a discriminated union: `{ ok: true, content }` on success,
 * `{ ok: false, status, error }` on failure. Callers should check `result.ok`
 * before using `result.content`.
 *
 * The API key is read from process.env.OPENROUTER_API_KEY. If missing, returns
 * an error result rather than throwing - lets the caller decide how to surface it.
 */
export async function callGemma(
  options: GemmaCallOptions
): Promise<GemmaCallResult | GemmaCallError> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: 'OPENROUTER_API_KEY not configured on the server.',
    };
  }

  const requestBody: Record<string, unknown> = {
    model: options.model ?? DEFAULT_MODEL,
    messages: [
      { role: 'system', content: options.systemPrompt },
      { role: 'user', content: options.userMessage },
    ],
    temperature: options.temperature ?? DEFAULT_TEMPERATURE,
  };

  if (options.jsonMode !== false) {
    requestBody.response_format = { type: 'json_object' };
  }

  try {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: 'OpenRouter returned an error',
        details: data,
      };
    }

    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || content.length === 0) {
      return {
        ok: false,
        status: 502,
        error: 'Empty content returned from Gemma',
        details: data,
      };
    }

    return {
      ok: true,
      content,
      usage: data.usage,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 500,
      error: 'Network error calling OpenRouter',
      details: String(err),
    };
  }
}

/**
 * Safely parse a JSON-mode response from Gemma. Strips markdown fences if the
 * model wraps the JSON in ```json blocks despite being told not to.
 */
export function parseGemmaJson<T>(raw: string): { ok: true; value: T } | { ok: false; raw: string } {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned) as T;
    return { ok: true, value: parsed };
  } catch {
    return { ok: false, raw };
  }
}
