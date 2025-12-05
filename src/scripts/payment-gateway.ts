/**
 * Payment gateway simulation
 * Imitates a payment transaction
 */

export interface PaymentResult {
    success: boolean
    transactionId: string
    amount: number
    currency: string
}

/**
 * Process a payment (simulated)
 * @param amount - Payment amount
 * @param currency - Currency code (default: 'USD')
 * @returns Payment result with transaction ID
 */
export async function processPayment(
    amount: number,
    currency: string = 'USD'
): Promise<PaymentResult> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate a mock transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    return {
        success: true,
        transactionId,
        amount,
        currency,
    }
}

