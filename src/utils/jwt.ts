export interface decodedHeader {}
export interface decodedPayload {}
export interface signature {}

export interface JWTToken {
    header: decodedHeader,
    payload: decodedPayload,
    signature: signature,
}

export function decodeJWT(tokenStr: string): JWTToken {
    const parts = tokenStr.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT structure');
    }

    const [header, payload, signature] = parts;

    // Decode base64 URL-encoded strings
    const decodeBase64Url = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        return decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
    };

    try {
        const decodedHeader = JSON.parse(decodeBase64Url(header));
        const decodedPayload = JSON.parse(decodeBase64Url(payload));
        return {
            header: decodedHeader,
            payload: decodedPayload,
            signature: signature,
        };
    } catch (err: any) {
        throw new Error('Failed to decode JWT: ' + err.message);
    }
}
