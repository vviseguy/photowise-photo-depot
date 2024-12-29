// auth.js
let userAuthenticated = false;
let authCode = null;

function redirectToLogin() {
  const currentUrl = window.location.href.split("?")[0];
  const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login/continue?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(
    currentUrl
  )}&response_type=code&scope=email+openid+phone`;

  if (window.self !== window.top) {
    const loginWindow = window.open(loginUrl, "_blank");
    const messageListener = (event) => {
      if (event.origin === new URL(currentUrl).origin) {
        if (event.data === "auth-success") {
          window.location.reload(); // Reload the iframe page to reflect authentication
          loginWindow.close();
          window.removeEventListener("message", messageListener);
        }
      }
    };

    window.addEventListener("message", messageListener);
  } else {
    window.location.href = loginUrl;
  }
}

function handleAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("code")) {
    authCode = params.get("code");
    console.log("User authenticated with code:", authCode);
    userAuthenticated = true;
    removeCodeFromUrl();

    // Notify the parent page (in the case that this page was opened in another tab as part of the auth process)
    if (window.opener) {
      window.opener.postMessage("auth-success", window.location.origin);
    }
  }
}

function removeCodeFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  const newUrl = url.pathname + url.search;
  window.history.replaceState({}, document.title, newUrl);
}

export { redirectToLogin, handleAuthRedirect, userAuthenticated };
