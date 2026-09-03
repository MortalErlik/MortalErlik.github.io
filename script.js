document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('privacyModal');
  const openButtons = document.querySelectorAll('[data-open-privacy]');
  const closeButtons = document.querySelectorAll('[data-close-privacy]');

  const openModal = () => {
    if (!modal) return;
    modal.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.close();
    document.body.style.overflow = '';
    if (window.location.hash === '#privacy') {
      history.replaceState(null, null, ' ');
    }
  };

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) closeModal();
    });

    modal.addEventListener('cancel', () => {
      document.body.style.overflow = '';
      if (window.location.hash === '#privacy') {
        history.replaceState(null, null, ' ');
      }
    });
  }

  const syncHash = () => {
    if (window.location.hash === '#privacy') openModal();
  };
  syncHash();
  window.addEventListener('hashchange', syncHash);

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  const showToast = (msg) => {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'coralstudiosdev@yandex.com';
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(email);
        } else {
          const input = document.createElement('input');
          input.value = email;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
        }
        showToast(`Email copied to clipboard! (${email})`);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
});
