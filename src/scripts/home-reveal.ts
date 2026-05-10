const STORAGE_PREFIX = 'homeReveal:v1:';

function initHomeReveal() {
  const body = document.body;
  if (!body.hasAttribute('data-home-reveal-page')) return;

  const els = document.querySelectorAll<HTMLElement>('[data-home-reveal]');

  els.forEach((el) => {
    const id = el.dataset.homeReveal;
    if (!id) return;
    if (sessionStorage.getItem(STORAGE_PREFIX + id)) {
      el.classList.add('home-reveal-done');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        const id = el.dataset.homeReveal;
        if (!id || sessionStorage.getItem(STORAGE_PREFIX + id)) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          el.classList.add('home-reveal-done');
          sessionStorage.setItem(STORAGE_PREFIX + id, '1');
          observer.unobserve(el);
        }
      });
    },
    { threshold: [0, 0.15, 0.25, 0.5, 0.75, 1] },
  );

  els.forEach((el) => {
    const id = el.dataset.homeReveal;
    if (!id || sessionStorage.getItem(STORAGE_PREFIX + id)) return;
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomeReveal);
} else {
  initHomeReveal();
}
