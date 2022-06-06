window.addEventListener("load", start);


function start() {

  if ("serviceWorker" in navigator) {

    registerServiceWorker();

  }
}

function registerServiceWorker() {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service worker installed"))
    .catch(() => console.log("Sevice Worker discarded"));
}


