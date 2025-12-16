import { CAPTCHA_EVENT_TYPES } from '@/types/captcha';

export const recaptchaHandleJoinWishlist = async (
    action: 'hero' | 'join-us',
    id: string, // Element ID wher we show the captcha (turnstile-container)
    email: string,
    setIsLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    setShowSuccessModal: (showSuccessModal: boolean) => void,
    setEmail: (email: string) => void
): Promise<void> => {
    console.log('recaptchaHandleJoinWishlist', email, id)
    if (!email.trim()) {
        setError('Please enter your email address')
        return
    }

    setIsLoading(true)
    setError(null)

    // Set up temporary event listener for captcha-response
    const handleCaptchaResponse = async (event: Event) => {
        console.log('handleCaptchaResponse', event, 'for action', action, 'and id', id)
        const customEvent = event as CustomEvent<{ token: string }>
        const recaptchaToken = customEvent.detail.token

        // Remove the event listener
        document.removeEventListener(CAPTCHA_EVENT_TYPES.RESPONSE, handleCaptchaResponse)

        try {
            const response = await fetch('/api-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'joinwishlist',
                    params: {
                        email: email.trim(),
                        recaptchaToken: recaptchaToken,
                        action: action
                    },
                    id: 1
                })
            })

            const data = await response.json()

            if (data.error) {
                setError(data.error.data || data.error.message || 'Failed to join wishlist')
                setIsLoading(false)

                return
            }

            if (data.result && data.result.success) {
                setShowSuccessModal(true)
                setEmail('')
            } else {
                setError('Failed to join wishlist')
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Add event listener for captcha-response
    document.addEventListener(CAPTCHA_EVENT_TYPES.RESPONSE, handleCaptchaResponse)


    console.log('request-captcha event dispatched')
    // Dispatch request-captcha event to trigger reCAPTCHA execution
    const requestEvent = new CustomEvent(CAPTCHA_EVENT_TYPES.REQUEST, { detail: { action, id } })
    document.dispatchEvent(requestEvent)
}

export const handleJoinWishlist = async (
    action: 'hero' | 'join-us',
    id: string, // Element ID wher we show the captcha (turnstile-container)
    email: string,
    setIsLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    setShowSuccessModal: (showSuccessModal: boolean) => void,
    setEmail: (email: string) => void
): Promise<void> => {
    if (!email.trim()) {
        setError('Please enter your email address')
        return
    }

    setIsLoading(true)
    setError(null)

    // Set up temporary event listener for captcha-response
    try {
        const response = await fetch('/api-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'joinwishlist-unsafe',
                params: {
                    email: email.trim(),
                    recaptchaToken: '',
                    action: action
                },
                id: 1
            })
        })

        const data = await response.json()

        if (data.error) {
            setError(data.error.data || data.error.message || 'Failed to join wishlist')
            setIsLoading(false)

            return
        }

        if (data.result && data.result.success) {
            setShowSuccessModal(true)
            setEmail('')
        } else {
            setError('Failed to join wishlist')
        }
    } catch (err: any) {
        setError(err.message || 'An error occurred. Please try again.')
    } finally {
        setIsLoading(false)
    }

}