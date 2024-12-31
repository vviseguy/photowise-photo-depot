// auth/auth.js
import { getToken, saveToken, startTokenRenewalCheck, initializeToken } from "./tokenManager";

export function initAuthentication(){
  handleAuthRedirect()

  initializeToken()
  startTokenRenewalCheck()
}

export function needLogin(){
  return !!getToken()
}

let userAuthenticated = false;

function redirectToLogin() {
  const currentUrl = window.location.href.split("?")[0];

  const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login/continue?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(
    currentUrl
  )}&response_type=token&scope=email+openid`;
  console.log(loginUrl);
  window.location.href = loginUrl;
}

function handleAuthRedirect() {
  const params = new URLSearchParams(window.location.hash.substring(1)); // Use hash instead of search for tokens

  if (params.has("access_token")) {
    saveToken(params.get("access_token"));
    console.log("Access token:", getToken());
    userAuthenticated = true;
    removeTokenFromUrl();
  }
}

function removeTokenFromUrl() {
  const url = new URL(window.location.href);
  url.hash = ""; // Clear the hash to remove token from the URL
  const newUrl = url.pathname + url.search;
  window.history.replaceState({}, document.title, newUrl);
}

function isAdmin() {
  const accessToken = getToken()
  if (!accessToken) return false;
  const decoded = decodeJWT(accessToken);
  return decoded["cognito:groups"]?.includes("admin");
}

export { redirectToLogin, handleAuthRedirect, userAuthenticated, isAdmin };
