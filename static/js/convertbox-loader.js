(function () {
  var loader = document.getElementById('convertbox-loader');
  if (!loader) return;

  var loaded = false;
  var events = ['pointerdown', 'touchstart', 'scroll', 'keydown'];

  function removeListeners() {
    events.forEach(function (eventName) {
      window.removeEventListener(eventName, loadConvertBox);
    });
  }

  function loadConvertBox() {
    if (loaded) return;
    loaded = true;
    removeListeners();

    var script = document.createElement('script');
    script.id = 'app-convertbox-script';
    script.src = loader.dataset.src;
    script.async = true;
    script.dataset.uuid = loader.dataset.uuid;
    document.head.appendChild(script);
  }

  events.forEach(function (eventName) {
    window.addEventListener(eventName, loadConvertBox, {
      passive: eventName !== 'keydown',
      once: true,
    });
  });
})();
