import { actions } from 'astro:actions';
import type { Star } from '@/types/star';

/**
 * Get star by ID (read-only, no event)
 */
export async function getStarById(starId: string): Promise<Star | null> {
    try {
        const result = await actions.getStarById({ starId });
        if (result.data?.success && result.data.data) {
            return result.data.data;
        }
        return null;
    } catch (error) {
        console.error('Error getting star by id:', error);
        return null;
    }
}

/**
 * Get star by email (read-only, no event)
 */
export async function getStarByEmail(email: string): Promise<Star | null> {
    try {
        const result = await actions.getStarByEmail({ email });
        if (result.data?.success && result.data.data) {
            return result.data.data;
        }
        return null;
    } catch (error) {
        console.error('Error getting star by email:', error);
        return null;
    }
}

