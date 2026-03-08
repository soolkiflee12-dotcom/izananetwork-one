(() => {
  const mountHeader = async () => {
    const el = document.getElementById("site-header");
    if (!el) return;
    
    try {
      const res = await fetch("/izananetwork-one/header.html", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const html = await res.text();
      el.innerHTML = html;

      // Restore theme after loading header
      const icon = document.getElementById("themeIcon");
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
        if (icon) icon.textContent = "☀️";
      } else {
        if (icon) icon.textContent = "🌙";
      }
    } catch (error) {
      console.error("Failed to load header:", error);
      el.innerHTML = '<p style="color: red;">Error loading header</p>';
    }
  };

  window.toggleDark = function () {
    const html = document.documentElement;
    const icon = document.getElementById("themeIcon");
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.theme = "dark";
      if (icon) icon.textContent = "☀️";
    } else {
      localStorage.theme = "light";
      if (icon) icon.textContent = "🌙";
    }
  };

  // Mount header when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHeader);
  } else {
    mountHeader();
  }
})();
