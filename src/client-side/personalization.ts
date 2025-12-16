import { getDemo } from './demo';
import { actions } from 'astro:actions';
import type { Personalization } from '@/types/personalization';

/**
 * Get personalizations for current user and context
 */
export async function getPersonalizations(
  context: string
): Promise<Personalization[]> {
  try {
    const demo = getDemo();
    if (!demo.email) {
      return [];
    }

    const result = await actions.getPersonalizations({
      context,
      email: demo.email,
    });

    if (result.data?.success && result.data.data) {
      return result.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error getting personalizations:', error);
    return [];
  }
}

/**
 * Generate code from prompt
 */
export async function generatePersonalizationCode(
  prompt: string,
  context: string,
  componentStructure: string[]
): Promise<{ success: boolean; code?: string; uris?: string[]; error?: string }> {
  try {
    const demo = getDemo();
    if (!demo.email) {
      return { success: false, error: 'User not logged in' };
    }

    const result = await actions.generatePersonalizationCode({
      prompt,
      context,
      componentStructure,
      email: demo.email,
    });

    if (result.data?.success && result.data.code) {
      return {
        success: true,
        code: result.data.code,
        uris: result.data.uris || []
      };
    }
    return { success: false, error: result.data?.error || 'Failed to generate code' };
  } catch (error) {
    console.error('Error generating code:', error);
    return { success: false, error: 'An error occurred' };
  }
}

/**
 * Save personalization (create or update)
 */
export async function savePersonalization(
  context: string,
  code: string,
  prompt: string,
  uris: string[],
  personalizationId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const demo = getDemo();
    if (!demo.email) {
      return { success: false, error: 'User not logged in' };
    }

    const result = await actions.savePersonalization({
      context,
      code,
      prompt,
      uris,
      email: demo.email,
      personalizationId,
    });

    if (result.data?.success) {
      return { success: true };
    }
    return { success: false, error: result.data?.error || 'Failed to save' };
  } catch (error) {
    console.error('Error saving personalization:', error);
    return { success: false, error: 'An error occurred' };
  }
}

/**
 * Delete personalization
 */
export async function deletePersonalization(
  personalizationId: string
): Promise<boolean> {
  try {
    const result = await actions.deletePersonalization({ personalizationId });
    return result.data?.success || false;
  } catch (error) {
    console.error('Error deleting personalization:', error);
    return false;
  }
}
