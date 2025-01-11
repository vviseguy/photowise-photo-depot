// context/AuthContext.tsx

import { decodeJWT } from "aws-amplify/auth";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { parseHash } from '../utils/parseHash';
import ProjectService from "../services/projectService";
import { useNavigate } from "react-router-dom";

interface User {
  sub: string;
  email?: string;
  name?: string;
  // Add other user fields as needed
}

interface AuthContextType {
  accessToken: string | null;
  idToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, idToken: string) => void;
  initLogin: () => void;
  logout: () => void;
  projectService: ProjectService;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem('accessToken')
  );
  const [idToken, setIdToken] = useState<string | null>(
    () => localStorage.getItem('idToken')
  );


  const navigate = useNavigate();
  const redirectPath = "/redirect"; // Ensure no query params


  const decodedIDToken = idToken ? decodeJWT(idToken).payload : null;
  const user: User | null = decodedIDToken
    ? {
      sub: decodedIDToken.sub ?? "not provided",
      email: decodedIDToken.email as string,
      name: decodedIDToken.name as string,
      // Extract other fields as needed
    }
    : null;

  const isAuthenticated = !!accessToken;

  // Initialize ProjectService with the current accessToken
  const [projectService] = useState<ProjectService>(() => new ProjectService(accessToken));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      projectService.setAccessToken(accessToken);
    } else {
      localStorage.removeItem('accessToken');
      projectService.setAccessToken(null);
    }

    if (idToken) {
      localStorage.setItem('idToken', idToken);
    } else {
      localStorage.removeItem('idToken');
    }
  }, [accessToken, idToken]);

  // Function to handle token extraction from URL
  const handleRedirect = () => {



    const hash = window.location.hash;
    if (hash) {
      const tokens = parseHash(hash);

      if (tokens.access_token && tokens.id_token) {
        login(tokens.access_token, tokens.id_token);
      }     

      const from = localStorage.getItem("from") ?? "/"
      if (window.location.pathname == redirectPath) {
        navigate(from)
      }
  
      if (tokens.expires_in) {
        // Calculate time until token expiry
        const decoded = tokens.id_token ? decodeJWT(tokens.id_token).payload : null;
        const currentTime = Math.floor(Date.now() / 1000);
        
        const timeUntilExpiry = decoded?.exp ? decoded.exp - currentTime : NaN;

        console.log(timeUntilExpiry)
        if (timeUntilExpiry > 300) {
          const timeout = setTimeout(() => {
            refreshAccessToken();
          }, (timeUntilExpiry - 300) * 1000);

          return () => clearTimeout(timeout);
        } else {
          refreshAccessToken();
        }
      }


    }


  };

  useEffect(() => {
    handleRedirect();
  }, []);

  // Token refresh logic
  useEffect(() => {
    if (!accessToken || !idToken) return;

    const decoded = decodeJWT(idToken).payload;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = (decoded.exp ?? 0) - currentTime;

    if (timeUntilExpiry > 300) {
      // Set a timeout to refresh the token 5 minutes before it expires
      const timeout = setTimeout(() => {
        refreshAccessToken();
      }, (timeUntilExpiry - 300) * 1000);

      return () => clearTimeout(timeout); // Cleanup the timeout if accessToken changes
    } else {
      // Token is already close to expiring, refresh immediately
      refreshAccessToken();
    }
  }, [accessToken, idToken]);

  const refreshAccessToken = async () => {
    try {
      console.log('Refreshing access token...');
      // Simulate a server call to refresh token
      const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.newAccessToken && data.newIdToken) {
          login(data.newAccessToken, data.newIdToken);
        } else if (data.newAccessToken) {
          login(data.newAccessToken, idToken!); // Assuming idToken is still valid
        } else {
          throw new Error('Invalid token response');
        }
      } else {
        console.error('Failed to refresh token');
        logout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  const login = (newAccessToken: string, newIdToken: string) => {
    setAccessToken(newAccessToken);
    setIdToken(newIdToken);
  };

  const initLogin = () => {
    localStorage.setItem("from", window.location.pathname)
    const redirectUrl = window.location.origin + redirectPath

    const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&response_type=token&scope=email+openid`;

    window.location.href = loginUrl;
  };

  const logout = () => {
    setAccessToken(null);
    setIdToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, idToken, isAuthenticated, user, login, initLogin, logout, projectService }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
