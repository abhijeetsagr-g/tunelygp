(function () {
  "use strict";

  var toggle = document.getElementById("themeToggle");
  var label = document.getElementById("themeLabel");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shots-grid img"));

  function applyTheme(theme) {
    var dark = theme === "dark";
    shots.forEach(function (img) {
      img.src = dark ? img.dataset.dark : img.dataset.light;
    });
    toggle.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    label.textContent = dark ? "Dark" : "Light";
  }

  toggle.addEventListener("click", function () {
    applyTheme(toggle.dataset.theme === "light" ? "dark" : "light");
  });
})();
