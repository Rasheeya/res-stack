/**
 * Stackly Custom JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // Sticky Header
  const header = document.querySelector('.js-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--sticky');
      header.style.background = '#ffffff';
      header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      
      // Update links for white background
      const links = document.querySelectorAll('.navbar__link');
      links.forEach(link => {
        link.style.color = 'var(--color-dark)';
      });
      
    } else {
      header.classList.remove('header--sticky');
      header.style.background = 'transparent';
      header.style.boxShadow = 'none';
      
      // Revert links for dark background hero
      const links = document.querySelectorAll('.navbar__link');
      links.forEach(link => {
        // If not hero dark section, might need different logic
        // We'll keep it simple for index hero
        link.style.color = '#ffffff';
      });
      // specific fix for non-hero pages could go here.
    }
  });
});
