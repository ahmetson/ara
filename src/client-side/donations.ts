import type { Transaction } from '@/types/transaction';

/**
 * Donations are disabled. Return an empty transaction list.
 * @param galaxyId - The galaxy ID
 * @returns Empty array
 */
export async function getDonations(galaxyId: string): Promise<Transaction[]> {
    void galaxyId;
    return [];
}

