(() => {
  "use strict";

  console.log("🚀 Site.js initialized");

  /**
   * โหลด header component
   */
  const mountHeader = async () => {
    console.log("📍 Mounting header...");
    
    const headerElement = document.getElementById("site-header");
    
    if (!headerElement) {
      console.error("❌ #site-header element not found");
      return;
    }

    try {
      console.log("📡 Fetching header.html...");
      
      const response = await fetch("/header.html", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Accept": "text/html"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const headerHTML = await response.text();
      console.log("✅ Header HTML received");
      
      headerElement.innerHTML = headerHTML;
      console.log("✅ Header injected into DOM");

      // ✅ ตั้งค่า Dark Mode
      setTimeout(() => {
        initializeDarkMode();
      }, 50);

      // ✅ ตั้งค่า Mobile Menu
      setTimeout(() => {
        initializeMobileMenu();
      }, 50);

      // ✅ ตั้งค่า Theme Toggle
      setTimeout(() => {
        setupThemeToggle();
      }, 50);

    } catch (error) {
      console.error("❌ Failed to load header:", error);
      headerElement.innerHTML = `<div class="text-red-500 p-4">⚠️ Error loading header</div>`;
    }
  };

  /**
   * โหลด components (Footer)
   */
  const mountComponents = async () => {
    console.log("📍 Mounting components...");
    
    const componentsElement = document.getElementById("site-components");
    
    if (!componentsElement) {
      console.warn("⚠️ #site-components element not found");
      return;
    }

    try {
      console.log("📡 Fetching components.html...");
      
      const response = await fetch("/components.html", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Accept": "text/html"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const componentsHTML = await response.text();
      console.log("✅ Components HTML received");
      
      componentsElement.innerHTML = componentsHTML;
      console.log("✅ Components (Footer) injected into DOM");

    } catch (error) {
      console.error("❌ Failed to load components:", error);
      componentsElement.innerHTML = `<div class="text-red-500 p-4">⚠️ Error loading footer</div>`;
    }
  };

  /**
   * ตั้งค่า Dark Mode
   */
  const initializeDarkMode = () => {
    console.log("🌓 Initializing dark mode...");
    
    const html = document.documentElement;
    
    // ตรวจสอบ localStorage สำหรับ theme ที่บันทึกไว้
    const savedTheme = localStorage.getItem("theme");

    // ถ้าเคยบันทึก ให้ใช้ที่บันทึก ไม่งั้นเป็นสว่าง (light)
    if (savedTheme === "dark") {
      html.classList.add("dark");
      updateThemeIcon("☀️");
      console.log("🌙 Dark mode enabled");
    } else {
      html.classList.remove("dark");
      updateThemeIcon("🌙");
      console.log("☀️ Light mode enabled (default)");
    }
  }

  /**
   * อัปเดต icon ของ theme toggle
   */
  const updateThemeIcon = (icon) => {
    const themeIcon = document.getElementById("themeIcon");
    if (themeIcon) {
      themeIcon.textContent = icon;
      console.log(`🎨 Theme icon updated to: ${icon}`);
    }
  };

  /**
   * ตั้งค่า Theme Toggle Button
   */
  const setupThemeToggle = () => {
    console.log("🔘 Setting up theme toggle...");
    
    const themeIcon = document.getElementById("themeIcon");
    
    if (themeIcon) {
      themeIcon.removeEventListener("click", window.toggleDarkMode);
      themeIcon.addEventListener("click", window.toggleDarkMode);
      console.log("✅ Theme toggle ready");
    } else {
      console.warn("⚠️ Theme icon button not found");
    }
  };

  /**
   * สลับ Dark Mode
   */
  window.toggleDarkMode = function () {
    console.log("🔄 Toggling dark mode...");
    
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      updateThemeIcon("🌙");
      console.log("☀️ Switched to light mode");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("☀️");
      console.log("🌙 Switched to dark mode");
    }
  };

  /**
   * ตั้งค่า Mobile Menu
   */
  const initializeMobileMenu = () => {
    console.log("📱 Initializing mobile menu...");
    
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) {
      console.warn("⚠️ Menu button or mobile menu not found");
      console.warn("menuBtn:", menuBtn);
      console.warn("mobileMenu:", mobileMenu);
      return;
    }

    console.log("✅ Menu elements found");

    // ✅ เปิด/ปิด Menu เมื่อคลิก 3 ขีด
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", mobileMenu.classList.contains("hidden") ? "false" : "true");
      console.log("📋 Mobile menu toggled");
    });

    // ✅ ปิด Menu เมื่อคลิกเลือก Link
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        console.log("🔗 Menu link clicked - menu closed");
      });
    });

    // ✅ ปิด Menu เมื่อคลิกนอก
    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });

    // ✅ ปิด Menu เมื่อ resize เป็น desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        console.log("📏 Resized to desktop - menu hidden");
      }
    });

    console.log("✅ Mobile menu ready");
  };

  /**
   * ฟังก์ชัน toggle dark mode (สำหรับเข้ากันได้กับ HTML เดิม)
   */
  window.toggleDark = window.toggleDarkMode;

  // ✅ รอให้ DOM โหลดสำเร็จก่อนเริ่ม
  console.log("🔍 Current DOM readyState:", document.readyState);
  
  if (document.readyState === "loading") {
    console.log("⏳ Waiting for DOMContentLoaded...");
    document.addEventListener("DOMContentLoaded", () => {
      console.log("✅ DOMContentLoaded fired");
      mountHeader();
      mountComponents(); // ✅ เพิ่มการโหลด components
    });
  } else {
    console.log("✅ DOM already ready");
    mountHeader();
    mountComponents(); // ✅ เพิ่มการโหลด components
  }

  // ✅ Retry mechanism - เพื่อกรณี #site-header ถูกสร้างหลังจากนั้น
  if (!document.getElementById("site-header") || !document.getElementById("site-components")) {
    console.log("⏱️ Elements not found yet, setting up observer...");
    
    const observer = new MutationObserver(() => {
      if (document.getElementById("site-header") && !document.querySelector("#site-header > *")) {
        console.log("👁️ #site-header detected by observer");
        mountHeader();
      }

      if (document.getElementById("site-components") && !document.querySelector("#site-components > *")) {
        console.log("👁️ #site-components detected by observer");
        mountComponents();
      }

      if (document.querySelector("#site-header > *") && document.querySelector("#site-components > *")) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Timeout ป้องกัน observer ค้างไว้
    setTimeout(() => {
      observer.disconnect();
      console.log("🛑 Observer disconnected (timeout)");
    }, 5000);
  }

})();