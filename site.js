(() => {
  "use strict";

  /**
   * โหลด header component
   */
  const mountHeader = async () => {
    const headerElement = document.getElementById("site-header");
    
    if (!headerElement) {
      console.warn("❌ #site-header element not found");
      return;
    }

    try {
      const response = await fetch("/izananetwork-one/header.html", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Accept": "text/html",
          "Content-Type": "text/html"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const headerHTML = await response.text();
      headerElement.innerHTML = headerHTML;

      console.log("✅ Header loaded successfully");

      // ✅ ตั้งค่า Dark Mode
      initializeDarkMode();

      // ✅ ตั้งค่า Mobile Menu
      initializeMobileMenu();

      // ✅ ตั้งค่า Theme Toggle
      setupThemeToggle();

    } catch (error) {
      console.error("❌ Failed to load header:", error);
      headerElement.innerHTML = `<div class="text-red-500 p-4">Error loading header</div>`;
    }
  };

  /**
   * ตั้งค่า Dark Mode
   */
  const initializeDarkMode = () => {
    const html = document.documentElement;
    
    // ตรวจสอบ localStorage สำหรับ theme ที่บันทึกไว้
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      html.classList.add("dark");
      updateThemeIcon("☀️");
    } else {
      html.classList.remove("dark");
      updateThemeIcon("🌙");
    }
  };

  /**
   * อัปเดต icon ของ theme toggle
   */
  const updateThemeIcon = (icon) => {
    const themeIcon = document.getElementById("themeIcon");
    if (themeIcon) {
      themeIcon.textContent = icon;
    }
  };

  /**
   * ตั้งค่า Theme Toggle Button
   */
  const setupThemeToggle = () => {
    const themeIcon = document.getElementById("themeIcon");
    
    if (themeIcon) {
      themeIcon.addEventListener("click", toggleDarkMode);
    }
  };

  /**
   * สลับ Dark Mode
   */
  window.toggleDarkMode = function () {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      updateThemeIcon("🌙");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("☀️");
    }
  };

  /**
   * ตั้งค่า Mobile Menu
   */
  const initializeMobileMenu = () => {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) {
      console.warn("❌ Menu button or mobile menu not found");
      return;
    }

    // ✅ เปิด/ปิด Menu เมื่อคลิก 3 ขีด
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    // ✅ ปิด Menu เมื่อคลิกเลือก Link
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    // ✅ ปิด Menu เมื่อคลิกนอก
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });

    // ✅ ปิด Menu เมื่อ resize เป็น desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.add("hidden");
      }
    });
  };

  /**
   * ฟังก์ชัน toggle dark mode (สำหรับเข้ากันได้กับ HTML เดิม)
   */
  window.toggleDark = window.toggleDarkMode;

  // ✅ รอให้ DOM โหลดสำเร็จก่อนเริ่ม
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountHeader);
  } else {
    // DOM พร้อมแล้ว
    mountHeader();
  }

  // ✅ เพิ่ม mutation observer สำหรับกรณีที่ #site-header ถูกสร้างหลังจากนั้น
  if (!document.getElementById("site-header")) {
    const observer = new MutationObserver(() => {
      if (document.getElementById("site-header")) {
        mountHeader();
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

})();
