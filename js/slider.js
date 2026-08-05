/* ==========================================================================
   FLORIST & WEDDING DECORATION - TESTIMONIAL SLIDER JAVASCRIPT
   Handcrafted Carousel with autoplay, touch, and dot navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer?.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'block' : 'none';
      slide.style.opacity = index === currentIndex ? '1' : '0';
    });

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
        dot.style.backgroundColor = 'var(--primary)';
        dot.style.width = '24px';
      } else {
        dot.classList.remove('active');
        dot.style.backgroundColor = 'var(--border-subtle)';
        dot.style.width = '10px';
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    updateSlides();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Initialize
  updateSlides();
  startAutoplay();
});
