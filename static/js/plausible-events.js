(function () {
  window.plausible =
    window.plausible ||
    function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element ? event.target : event.target.parentElement;
    var link = target && target.closest('a');
    if (!link) return;

    var eventName = link.dataset.plausibleEvent;
    if (eventName) {
      window.plausible(eventName, {
        props: {
          href: link.href,
          source: link.dataset.plausibleSource || 'unknown',
        },
      });
    }

    if (link.origin && link.origin !== window.location.origin) {
      window.plausible('Outbound Link: Click', {
        props: {url: link.href},
      });
    }
  });
})();
