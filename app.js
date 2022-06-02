window.addEventListener("load", start);

function start() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("service worker registered"))
      .catch(() => console.log("Failed to register service worker"));
  }
}
