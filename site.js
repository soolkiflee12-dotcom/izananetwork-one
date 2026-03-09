(() => {
  const mountHeader = async () => {
    const el = document.getElementById("site-header");
    if (!el) return;
    const res = await fetch("/izananetwork-one/header.html", { cache: "no-store" });
    el.innerHTML = await res.text();

    const icon = document.getElementById("themeIcon");
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      if (icon) icon.textContent = "☀️";
    } else {
      if (icon) icon.textContent = "🌙";
    }

    // ✅ เพิ่ม mobile menu event listener หลังจากโหลด header
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", function() {
        mobileMenu.classList.toggle("hidden");
      });
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

  mountHeader().catch(() => {});
})();
