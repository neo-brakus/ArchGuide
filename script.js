// Mobile menu functionality
function toggleMobileMenu() {
  const overlay = document.querySelector('.mobile-overlay');
  const toc = document.querySelector('.mobile-toc');
  const menu_button = document.querySelector('.mobile-menu-btn');
  overlay.classList.add('show');
  toc.classList.add('open');
  menu_button.style.transform = 'translateX(-200%)';
}

function closeMobileMenu() {
  const overlay = document.querySelector('.mobile-overlay');
  const toc = document.querySelector('.mobile-toc');
  const menu_button = document.querySelector('.mobile-menu-btn');
  overlay.classList.remove('show');
  toc.classList.remove('open');
  menu_button.style.transform = 'translateX(0)';
}

// Settings functionality
function setFontSize(size, element) {
  document.documentElement.style.setProperty('--font-size', size);

  // Update active button
  document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  }
}

// Initialize settings
document.addEventListener('DOMContentLoaded', function() {
  // Set initial font size and mark medium as active
  setFontSize('1rem');
  document.querySelector('.font-btn[data-size="medium"]').classList.add('active');
});

// Active TOC link highlighting
function updateActiveTocLink() {
  const sections = document.querySelectorAll('.section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');

  let currentSection = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom > 100) {
      currentSection = section.id;
    }
  });

  tocLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Scroll event listener for active TOC highlighting
window.addEventListener('scroll', updateActiveTocLink);

// Initial call to set active link
updateActiveTocLink();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});