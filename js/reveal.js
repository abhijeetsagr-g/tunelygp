/* ============================================================
   reveal.js — Scroll-triggered reveal animations
   ------------------------------------------------------------
   * Marks every element with [data-reveal] as hidden, then
     reveals it once it scrolls into the viewport
   * Optional `data-reveal-delay="<ms>"` staggers the animation
   * Degrades gracefully: without JS everything stays visible
   ============================================================ */

(() => {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.revealDelay || "0", 10);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add("reveal--visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => {
    el.classList.add("reveal--hidden");
    observer.observe(el);
  });
})();
