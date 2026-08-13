/* ============================================================
   theme-toggle.js — Light/dark theme switching
   ------------------------------------------------------------
   * Sets `data-theme` ("light" | "dark") on <html>
   * Persists the choice in localStorage
   * Swaps <img> src to the matching `_light` / `_dark` variant
     for any image carrying data-light + data-dark attributes

   Loaded synchronously in <head> so the theme applies before
   first paint (no flash of the wrong theme).
   ============================================================ */

(() => {
  const STORAGE_KEY = "tunely-theme";
  const root = document.documentElement;

  const resolveTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const syncImages = (theme) => {
    root.querySelectorAll("img[data-light][data-dark]").forEach((img) => {
      img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
    });
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    syncImages(theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.setAttribute("aria-checked", theme === "dark");
  };

  const init = () => {
    setTheme(resolveTheme());

    const toggle = document.getElementById("theme-toggle");
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
