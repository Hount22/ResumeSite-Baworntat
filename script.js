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


// elment sound toggle
$(function () {
  const playerTrack = $("#player-track");
  const bgArtwork = $("#player-bg-artwork");
  const albumName = $("#album-name");
  const trackName = $("#track-name");
  const albumArt = $("#album-art");
  const sArea = $("#seek-bar-container");
  const seekBar = $("#seek-bar");
  const trackTime = $("#track-time");
  const seekTime = $("#seek-time");
  const sHover = $("#s-hover");
  const playPauseButton = $("#play-pause-button");
  const tProgress = $("#current-time");
  const tTime = $("#track-length");
  const playPreviousTrackButton = $("#play-previous");
  const playNextTrackButton = $("#play-next");
  const albums = [
    "Me & You",
    "Dawn",
    "Electro Boy",
    "Home",
    "Proxy (Original Mix)"
  ];
  const trackNames = [
    "Alex Skrindo - Me & You",
    "Skylike - Dawn",
    "Kaaze - Electro Boy",
    "Jordan Schor - Home",
    "Martin Garrix - Proxy"
  ];
  const albumArtworks = ["_1", "_2", "_3", "_4", "_5"];
  const trackUrl = [
    "https://singhimalaya.github.io/Codepen/assets/music/1.mp3",
    "https://singhimalaya.github.io/Codepen/assets/music/2.mp3",
    "https://singhimalaya.github.io/Codepen/assets/music/3.mp3",
    "https://singhimalaya.github.io/Codepen/assets/music/4.mp3",
    "https://singhimalaya.github.io/Codepen/assets/music/5.mp3"
  ];

  let bgArtworkUrl,
    i = playPauseButton.find("i"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    currIndex = -1,
    audio;

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) seekTime.text("--:--");
    else seekTime.text(ctMinutes + ":" + ctSeconds);

    seekTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    seekTime
      .text("00:00")
      .css({ left: "0px", "margin-left": "0px" })
      .fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      const currAlbum = albums[currIndex];
      const currTrackName = trackNames[currIndex];
      const currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);

      // แก้ไขตรงนี้ ให้ลบ class active จาก img ทั้งหมดก่อน แล้วใส่ class active ให้ img ที่ตรงกับ currArtwork
      albumArt.find("img").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");
      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });

    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
  }

  initPlayer();
});



// Export utils for potential use in other scripts
window.portfolioUtils = utils;
