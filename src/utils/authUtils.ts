// // auth/tokenManager.js

// import { JWT } from 'aws-amplify/auth';


// export function isTokenExpired(token: JWT): boolean {
//   const currentTime = Math.floor(Date.now() / 1000);

//   // Assuming the JWT token has an 'exp' field (expiry time in Unix timestamp)
//   return (token.payload.exp ?? NaN) < currentTime;
// }

// // Renew the token
// async function renewToken() {
//   try {
//     const response = await fetch("https://your-auth-endpoint/renew", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const data = await response.json();
//     saveToken(data.newToken);
//   } catch (error) {
//     console.error("Token renewal failed:", error);
//     redirectToLogin();
//   }
// }

// // Periodically check and renew the token
// export function startTokenRenewalCheck() {
//   setInterval(() => {
//     if (accessToken && isTokenExpired(accessToken)) {
//       renewToken();
//     }
//   }, 60000); // Check every minute
// }

// // Get the current access token
// export function getToken() {
//   return accessToken;
// }

