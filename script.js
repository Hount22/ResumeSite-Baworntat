// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Navigation elements
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile navigation toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  function smoothScroll(target, duration = 1000) {
    const targetSection = document.querySelector(target);
    if (!targetSection) return;

    const targetPosition = targetSection.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Add smooth scrolling to all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      // เช็คว่า href เริ่มต้นด้วย # หรือไม่
      if (target.startsWith("#")) {
        e.preventDefault(); // ป้องกัน default behavior
        smoothScroll(target); // ทำ smooth scroll
      }
      // ถ้าไม่ใช่ # เช่น index-th.html ปล่อยให้เปลี่ยนหน้าไปตามปกติเลย
      // แต่อย่าลืมปิดเมนูมือถือด้วยถ้ามี
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Scroll indicator smooth scrolling
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target);
    });
  }

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all nav links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to current section nav link
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  // Navbar background on scroll
  function updateNavbarBackground() {
    if (window.pageYOffset > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Scroll animations for sections
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(".fade-in");

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  // Add fade-in class to sections for animation
  function initScrollAnimations() {
    const sections = document.querySelectorAll("section > .container");
    sections.forEach((section) => {
      section.classList.add("fade-in");
    });

    // Add fade-in to other elements
    const animatedElements = document.querySelectorAll(
      ".timeline-item, .skill-category, .project-card, .stat"
    );
    animatedElements.forEach((element) => {
      element.classList.add("fade-in");
    });
  }

  // Typing animation for hero text
  function initTypingAnimation() {
    const heroName = document.querySelector(".hero-name");
    if (!heroName) return;

    const text = heroName.textContent;
    heroName.textContent = "";
    heroName.style.opacity = "1";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroName.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
  }

  // Parallax effect for hero section
  function initParallaxEffect() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Skills animation on scroll
  function animateSkills() {
    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((item, index) => {
      const elementTop = item.getBoundingClientRect().top;

      if (elementTop < window.innerHeight - 100) {
        setTimeout(() => {
          item.style.transform = "translateY(0)";
          item.style.opacity = "1";
        }, index * 50);
      }
    });
  }

  // Initialize skills animation styles
  function initSkillsAnimation() {
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item) => {
      item.style.transform = "translateY(20px)";
      item.style.opacity = "0";
      item.style.transition = "all 0.3s ease";
    });
  }

  // Project cards hover effect
  function initProjectCards() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // Contact form animation (if form is added later)
  function initContactAnimations() {
    const contactItems = document.querySelectorAll(".contact-item");

    contactItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Performance optimization: throttle scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Event listeners with throttling for performance
  window.addEventListener(
    "scroll",
    throttle(() => {
      updateActiveNav();
      updateNavbarBackground();
      animateOnScroll();
      animateSkills();
    }, 16)
  ); // ~60fps

  // Resize event listener
  window.addEventListener(
    "resize",
    throttle(() => {
      // Recalculate positions if needed
      updateActiveNav();
    }, 250)
  );

  // Initialize all animations and effects
  initScrollAnimations();
  initSkillsAnimation();
  initProjectCards();
  initContactAnimations();

  // Initialize typing animation for hero
  // initTypingAnimation(); // Uncomment if you want typing effect

  // Initialize parallax (commented out for performance, uncomment if desired)
  // initParallaxEffect();

  // Initial calls
  updateNavbarBackground();
  updateActiveNav();
  animateOnScroll();

  // Intersection Observer for better performance (modern alternative to scroll events)
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  }

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // ESC key closes mobile menu
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });

  // Preload optimization
  function preloadCriticalAssets() {
    // Preload any critical images or resources
    const criticalImages = [
      // Add any critical image URLs here
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadCriticalAssets();

  // Page load animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Trigger initial animations
    setTimeout(() => {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }
    }, 100);
  });

  // Console message for developers
  console.log("🚀 Portfolio website loaded successfully!");
  console.log("💼 Developed with modern web technologies");
  console.log("📱 Fully responsive and optimized");
});

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: function (func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  scrollToElement: function (element, offset = 80) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  },
};

// Footer sound toggle
const footerSound = document.getElementById("footerSound");
const audio = document.getElementById("audio");

footerSound.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    footerSound.classList.add("playing");
  } else {
    audio.pause();
    footerSound.classList.remove("playing");
  }
});

// Export utils for potential use in other scripts
window.portfolioUtils = utils;
