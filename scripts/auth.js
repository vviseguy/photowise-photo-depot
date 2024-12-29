let userAuthenticated = false;

function redirectToLogin() {
  const currentUrl = window.location.href.split("?")[0];
  const loginUrl = `https://us-west-2b2hpjjqgl.auth.us-west-2.amazoncognito.com/login/continue?client_id=59e3vejubvjscpv0vlkkrp1orq&redirect_uri=${encodeURIComponent(currentUrl)}&response_type=code&scope=email+openid+phone`;

//   if (window.top == window.self) {
    // If embedded in an iframe, open login in a new tab
    console.log("1")
    const newTab = window.open(loginUrl, "_blank");
    
    console.log("2")
    if (!newTab) {
      alert("Please enable popups to log in.");
    }
//   } else {
//     // Redirect in the same window
//     window.location.href = loginUrl;
//   }
}

function handleAuthRedirect() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("code")) {
    const authCode = params.get("code");
    localStorage.setItem("authCode", authCode);
    console.log("Authentication code stored:", authCode);

    // Clean the URL
    // const url = new URL(window.location.href);
    // url.searchParams.delete("code");
    // window.history.replaceState({}, document.title, url.pathname);

    // Auto-close the page if in a new tab or iframe
    // if (window.top == window.self) {
      window.close();
    // }
    
    
  }
}

function checkStorageForAuth() {
  const storedCode = localStorage.getItem("authCode");
  if (storedCode) {
    console.log("User is already authenticated with code:", storedCode);
    userAuthenticated = true;
  } else {
    userAuthenticated = false;
    
    // Listen for changes in storage to reload when authenticated
    reloadOnAuthChange();
  }
}

function reloadOnAuthChange() {
  window.addEventListener("storage", (event) => {
    if (event.key === "authCode" && event.newValue) {
      console.log("Authentication code detected in storage. Reloading page...");
      window.location.reload();
      
    }
  });
}

export {
  redirectToLogin,
  handleAuthRedirect,
  checkStorageForAuth,
  reloadOnAuthChange,
  userAuthenticated,
};
