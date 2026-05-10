export function initArticleScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-article-scroll-progress-bar]');
  if (!bar) return;

  const update = () => {
    const root = document.documentElement;
    const scrollable = root.scrollHeight - root.clientHeight;
    const p = scrollable <= 0 ? 1 : root.scrollTop / scrollable;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
