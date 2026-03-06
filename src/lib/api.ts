export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Helper to get the auth token from cookies (client-side only)
 */
export const getAuthToken = () => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
    if (match) return match[2];
    return null;
};

/**
 * Base fetch wrapper with auth token injection
 */
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Handle unauthorized globally if needed
        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = '/login';
            }
        }

        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    return response.json();
}
