// utils/parseHash.ts

export interface AuthTokens {
    id_token?: string;
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    [key: string]: any;
  }
  
  export function parseHash(hash: string): AuthTokens {
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const tokens: AuthTokens = {};
    
    params.forEach((value, key) => {
      tokens[key] = key === "expires_in" ? Number(value) : value;
    });
  
    return tokens;
  }
  