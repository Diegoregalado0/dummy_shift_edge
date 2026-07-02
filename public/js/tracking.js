(function () {
  function getSessionId() {
    var key = 'vm_session_id';
    var id = sessionStorage.getItem(key);
    if (!id) {
      id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(key, id);
    }
    return id;
  }

  function getUserId() {
    var key = 'vm_user_id';
    var id = localStorage.getItem(key);
    if (!id) {
      id = 'user_' + Math.random().toString(36).slice(2);
      localStorage.setItem(key, id);
    }
    return id;
  }

  function ping(payload) {
    var body = JSON.stringify(Object.assign({
      sessionId: getSessionId(),
      userId: getUserId(),
      url: location.href,
      page: document.body.getAttribute('data-page') || null,
      vin: document.body.getAttribute('data-vin') || null,
      timestamp: new Date().toISOString()
    }, payload));

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/ping', new Blob([body], { type: 'application/json' }));
    } else {
      fetch('/api/ping', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
    }
  }

  // Page view ping
  ping({ type: 'page_view' });

  // Performance metrics ping once the page has finished loading
  window.addEventListener('load', function () {
    setTimeout(function () {
      var nav = performance.getEntriesByType('navigation')[0];
      ping({
        type: 'performance',
        metrics: nav ? {
          loadTime: Math.round(nav.loadEventEnd - nav.startTime),
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          ttfb: Math.round(nav.responseStart - nav.startTime)
        } : null
      });
    }, 0);
  });
})();
