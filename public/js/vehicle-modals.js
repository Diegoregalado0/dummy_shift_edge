(function () {
  const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'-]*$/;
  const PHONE_PATTERN = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function setError(input, message) {
    const wrapper = input.closest('label');
    const errorEl = wrapper && wrapper.querySelector('.field-error');
    input.classList.toggle('invalid', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
    return !message;
  }

  function validateField(input) {
    const value = input.value.trim();

    if (input.name === 'firstName' || input.name === 'lastName') {
      if (!value) return setError(input, 'Required');
      if (!NAME_PATTERN.test(value)) return setError(input, 'Letters only, no numbers');
    }

    if (input.name === 'email') {
      if (!value) return setError(input, 'Required');
      if (!EMAIL_PATTERN.test(value)) return setError(input, 'Enter a valid email address');
    }

    if (input.name === 'phone') {
      if (!value) return setError(input, 'Required');
      if (!PHONE_PATTERN.test(value)) return setError(input, 'Enter a valid phone number, e.g. (555) 123-4567');
    }

    if (input.name === 'preferredDate') {
      if (!value) return setError(input, 'Required');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(value) < today) return setError(input, 'Choose a current or future date');
    }

    return setError(input, '');
  }

  document.addEventListener('click', function (e) {
    const openTrigger = e.target.closest('[data-open-modal]');
    if (openTrigger) {
      openModal(openTrigger.getAttribute('data-open-modal'));
      return;
    }
    const closeTrigger = e.target.closest('[data-close-modal]');
    if (closeTrigger) {
      closeModal(closeTrigger.closest('.modal-overlay'));
      return;
    }
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not([hidden])').forEach(closeModal);
    }
  });

  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    form.addEventListener('input', function (e) {
      if (e.target.matches('input')) validateField(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = form.querySelectorAll('input');
      let valid = true;
      inputs.forEach(function (input) {
        if (!validateField(input)) valid = false;
      });
      if (!valid) return;

      form.querySelectorAll('label, button[type="submit"]').forEach(function (el) {
        el.hidden = true;
      });
      const success = form.querySelector('.form-success');
      if (success) success.hidden = false;
    });
  });
})();
