// // auth/tokenManager.js

// import {decodeJWT} from "./jwtDecode.js";

// let accessToken = null;

// // Initialize token on page load
// export function initializeToken() {
//   const storedToken = localStorage.getItem("jwtToken");
//   if (storedToken) {
//     accessToken = storedToken;
//     if (isTokenExpired(accessToken)) {
//       renewToken();
//     }
//   } 
// }

// // Save token to localStorage
// export function saveToken(token) {
//   accessToken = token;
//   localStorage.setItem("jwtToken", token);
// }

// // Check if token is expired
// function isTokenExpired(token) {
//   try {
//     const tokenData = decodeJWT(token);
//     return Date.now() >= tokenData.exp * 1000;
//   } catch (err) {
//     console.error("Invalid token", err);
//     return true;
//   }
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

