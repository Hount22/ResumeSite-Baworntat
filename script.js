document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");

  // Function to handle navbar background on scroll
  function updateNavbarBackground() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Initial check
  updateNavbarBackground();

  // Listen for scroll events
  window.addEventListener("scroll", updateNavbarBackground);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          let target = document.querySelector(this.getAttribute('href'));
          if(target) {
              window.scrollTo({
                  top: target.offsetTop - 70, // Adjust for fixed navbar height
                  behavior: 'smooth'
              });
          }
      });
  });

});