import { useState } from 'react';
import { WaitlistFormData } from '../components/Waitlist';
import { parseName } from '../utils';
import { useRateLimiter } from './useRateLimiter';

// This hook makes requests to the resend API using values in the config file
// https://resend.com/docs/api-reference/introduction
export function useAddToWaitlist() {
    const apiKey = process.env.REACT_APP_RESEND_API_KEY;
    const audienceId = process.env.REACT_APP_RESEND_AUDIENCE_ID;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    // Rate limit requests to 1 request per 10 seconds
    const { attemptRequest } = useRateLimiter({ limit: 1, window: 10000 })

    const postAddToWaitlist = async (formData: WaitlistFormData) => {
        try {
            let response
            if (attemptRequest()) {
                response = await fetch(`/audiences/${audienceId}/contacts`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        unsubscribed: false,
                        ...parseName(formData.name)
                    })
                });

                if (response?.ok) {
                    setError(new Error(`HTTP error! status: ${response.status}`));
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
            } else {
                setError(new Error('Rate limit exceeded! Try again later'));
            }
            return response;
        } catch (e) {
            if (e instanceof Error) {
                setError(e)
            }
            setLoading(false);
        }
    };
    return {
        data,
        error,
        postAddToWaitlist,
        loading
    };
}
