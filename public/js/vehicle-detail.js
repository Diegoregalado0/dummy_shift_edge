(function () {
  const saveBtn = document.getElementById('vdp-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const saved = saveBtn.classList.toggle('is-saved');
      saveBtn.style.color = saved ? '#9b0a1e' : '';
      saveBtn.title = saved ? 'Saved' : 'Save vehicle';
    });
  }

  const shareBtn = document.getElementById('vdp-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', async function () {
      const shareData = { title: document.title, url: window.location.href };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // fall through to clipboard copy
        }
      }
      try {
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.title = 'Link copied!';
        setTimeout(function () { shareBtn.title = 'Share'; }, 2000);
      } catch (err) {
        // clipboard unavailable, nothing further to do
      }
    });
  }

  const lightbox = document.getElementById('vdp-lightbox');
  const lightboxClose = document.getElementById('vdp-lightbox-close');
  const vdpImage = document.getElementById('vdp-image');
  const expand1 = document.getElementById('vdp-expand-1');
  const expand2 = document.getElementById('vdp-expand-2');

  function openLightbox() {
    if (!lightbox) return;
    lightbox.hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove('modal-open');
  }

  [vdpImage, expand1, expand2].forEach(function (el) {
    if (el) el.addEventListener('click', openLightbox);
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  document.querySelectorAll('.vdp-accordion-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const panel = btn.closest('.vdp-accordion-item').querySelector('.vdp-accordion-panel');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
