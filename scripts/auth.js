// auth.js
let userAuthenticated = false;
let accessToken = null;

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
    accessToken = params.get("access_token");
    console.log("Access token:", accessToken);
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

export { redirectToLogin, handleAuthRedirect, userAuthenticated, accessToken };
