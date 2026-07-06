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
  const shareModal = document.getElementById('modal-share');
  const shareInput = document.getElementById('vdp-share-input');
  const shareCopyBtn = document.getElementById('vdp-share-copy');

  if (shareBtn) {
    shareBtn.addEventListener('click', async function () {
      const shareData = { title: document.title, url: window.location.href };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // fall through to the share modal
        }
      }
      if (shareInput) shareInput.value = window.location.href;
      if (shareCopyBtn) shareCopyBtn.textContent = 'Copy Link';
      if (shareModal) {
        shareModal.hidden = false;
        document.body.classList.add('modal-open');
      }
    });
  }

  if (shareInput) {
    shareInput.addEventListener('focus', function () { shareInput.select(); });
  }
  if (shareCopyBtn && shareInput) {
    shareCopyBtn.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(shareInput.value);
        shareCopyBtn.textContent = 'Copied!';
      } catch (err) {
        shareInput.select();
      }
      setTimeout(function () { shareCopyBtn.textContent = 'Copy Link'; }, 2000);
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

  const MAX_DAYS_OUT = 7;
  const WEEKDAY_FMT = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
  const MONTH_DAY_FMT = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });

  function getDate(offset) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  }
  function toISODate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  document.querySelectorAll('[data-date-slider]').forEach(function (root) {
    const track = root.querySelector('[data-date-track]');
    const hiddenInput = root.querySelector('[data-preferred-date]');
    const selectedLabel = root.querySelector('.date-slider-selected');
    if (!track || !hiddenInput) return;

    let selectedOffset = 0;

    function render() {
      track.innerHTML = '';
      for (let offset = 0; offset <= MAX_DAYS_OUT; offset++) {
        const date = getDate(offset);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'date-card' + (offset === selectedOffset ? ' is-selected' : '');
        card.innerHTML = '<span class="date-card-weekday">' + WEEKDAY_FMT.format(date) + '</span><span class="date-card-day">' + date.getDate() + '</span>';
        card.addEventListener('click', function () {
          selectedOffset = offset;
          render();
        });
        track.appendChild(card);
      }
      const selectedDate = getDate(selectedOffset);
      hiddenInput.value = toISODate(selectedDate);
      if (selectedLabel) selectedLabel.textContent = '(' + WEEKDAY_FMT.format(selectedDate) + ', ' + MONTH_DAY_FMT.format(selectedDate) + ')';
    }
    render();

    root.querySelectorAll('[data-scroll]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        track.scrollBy({ left: Number(btn.getAttribute('data-scroll')) * 92, behavior: 'smooth' });
      });
    });
  });
})();
