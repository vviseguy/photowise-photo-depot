// File: auth.js
let userAuthenticated = false;
let authCode = null;

function redirectToLogin() {
<<<<<<< Updated upstream
  if (window.self !== window.top) {
    // Notify parent page to handle login redirect
    window.parent.postMessage({ type: 'redirect_to_login', embedPageUrl: window.location.href }, '*');
    return;
  }

  const currentUrl = window.location.href.split('?')[0];
  const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login/continue?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(
    currentUrl
  )}&response_type=code&scope=email+openid+phone`;
=======
  const currentUrl = window.location.href.split("?")[0];

  const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login/continue?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(
    currentUrl
  )}&response_type=code&scope=email+openid+phone`;
  console.log(loginUrl);
>>>>>>> Stashed changes
  window.location.href = loginUrl;
}

function handleAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('code')) {
    authCode = params.get('code');
    console.log('User authenticated with code:', authCode);
    userAuthenticated = true;
    removeCodeFromUrl();
<<<<<<< Updated upstream
  }

  if (window.self !== window.top) {
    // Notify parent page of the authentication code
    window.parent.postMessage({ type: 'auth_code', code: authCode }, '*');
=======
>>>>>>> Stashed changes
  }
}

function removeCodeFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('code');
  const newUrl = url.pathname + url.search;
  window.history.replaceState({}, document.title, newUrl);
}

export { redirectToLogin, handleAuthRedirect, userAuthenticated };