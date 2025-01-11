// import { Auth, decodeJWT, JWT } from 'aws-amplify/auth';

// class AuthService {
//     private refreshThreshold: number;

//     constructor(refreshThreshold: number = 300) { // Default threshold: 5 minutes
//         this.refreshThreshold = refreshThreshold;
//     }

//     /**
//      * Checks if a token is expired or about to expire.
//      * @param token - JWT token string.
//      * @returns True if the token is expired or close to expiration.
//      */
//     private isTokenExpired(token: string): boolean {
//         const decoded: JWT = decodeJWT(token);
//         const currentTime = Math.floor(Date.now() / 1000);
//         return (decoded.payload.exp ?? NaN) - currentTime <= this.refreshThreshold;
//     }

//     /**
//      * Retrieves the current Cognito session.
//      * @returns The Cognito session object.
//      */
//     private async getSession(): Promise<any> {
//         try {
//             const session = await Auth.currentSession();
//             return session;
//         } catch (error) {
//             console.error('Error retrieving session:', error);
//             throw new Error('Unable to retrieve current session.');
//         }
//     }

//     /**
//      * Refreshes the Cognito tokens if needed.
//      * @returns The updated access token.
//      */
//     public async getValidAccessToken(): Promise<string> {
//         try {
//             const session = await this.getSession();
//             const accessToken = session.getAccessToken().getJwtToken();

//             if (this.isTokenExpired(accessToken)) {
//                 console.log('Access token expired or about to expire. Refreshing...');

//                 const newSession = await Auth.currentSession(); // Cognito automatically refreshes tokens here
//                 return newSession.getAccessToken().getJwtToken();
//             }

//             return accessToken;
//         } catch (error) {
//             console.error('Error while refreshing access token:', error);
//             throw new Error('Failed to refresh access token.');
//         }
//     }

//     /**
//      * Signs out the user and clears the session.
//      */
//     public async signOut(): Promise<void> {
//         try {
//             await Auth.signOut();
//             console.log('User signed out successfully.');
//         } catch (error) {
//             console.error('Error during sign out:', error);
//             throw new Error('Sign-out failed.');
//         }
//     }

//     /**
//      * Gets the current user's information.
//      * @returns The current user's information.
//      */
//     public async getCurrentUser(): Promise<any> {
//         try {
//             const user = await Auth.currentAuthenticatedUser();
//             return user;
//         } catch (error) {
//             console.error('Error retrieving current user:', error);
//             throw new Error('Unable to retrieve current user.');
//         }
//     }
// }

// export default AuthService;
