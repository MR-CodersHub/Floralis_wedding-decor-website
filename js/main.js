/* ==========================================================================
   FLORIST & WEDDING DECORATION - MAIN JAVASCRIPT
   Sticky Header, Mobile Menu Drawer, Scroll-To-Top, Active Links,
   Dark Mode Toggle, RTL Toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smart Sticky Header (Hide on Scroll Down, Reveal on Scroll Up)
  const header = document.querySelector('.header');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  let lastScrollY = Math.max(0, window.scrollY);
  let scrollTicking = false;

  // Always reset header to fully visible state on page load & page navigation
  function resetHeaderState() {
    if (!header) return;
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
    lastScrollY = Math.max(0, window.scrollY);
    if (lastScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Force header visible on initial load
  resetHeaderState();

  // Reset header state on page show (BFCache / back-forward navigation)
  window.addEventListener('pageshow', () => {
    resetHeaderState();
  });

  function handleScroll() {
    const currentScrollY = Math.max(0, window.scrollY);

    if (currentScrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Keep header permanently visible pinned at top while scrolling
    header?.classList.remove('header-hidden');
    header?.classList.add('header-visible');

    lastScrollY = currentScrollY;

    if (currentScrollY > 400) {
      scrollToTopBtn?.classList.add('visible');
    } else {
      scrollToTopBtn?.classList.remove('visible');
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(handleScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  // 2. Scroll To Top Action
  scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 3. Mobile Hamburger Drawer Toggle & Link Event Handlers
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function openMobileMenu() {
    header?.classList.remove('header-hidden');
    header?.classList.add('header-visible');
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
    });
  }

  // Auto-close drawer on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile drawer on pressing ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      if (typeof closeLightbox === 'function') closeLightbox();
    }
  });

  // 4. Set Active Navigation Link based on Current Page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 5. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('floralis-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        // Moon icon
        themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" fill="none" stroke="currentColor" stroke-width="2"/>`;
      } else {
        // Sun icon
        themeIcon.innerHTML = `<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>`;
      }
    }
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('floralis-theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // 6. RTL / LTR Direction Toggle
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('floralis-dir', dir);
    // Flip the RTL icon when direction changes
    if (rtlToggleBtn) {
      const svg = rtlToggleBtn.querySelector('svg');
      if (svg) {
        svg.style.transform = dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)';
      }
    }
  }

  // Apply saved direction on load
  const savedDir = localStorage.getItem('floralis-dir') || 'ltr';
  applyDirection(savedDir);

  rtlToggleBtn?.addEventListener('click', () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    applyDirection(currentDir === 'rtl' ? 'ltr' : 'rtl');
  });

  // 7. User Account Header Dropdown Toggle
  const userBtn = document.getElementById('userDropdownBtn');
  const userMenu = document.getElementById('userDropdownMenu');

  if (userBtn && userMenu) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('show');
      userBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove('show');
        userBtn.classList.remove('active');
      }
    });
  }

  // 8. Automatic 6-Review Carousel Slider with Autoplay (Every 4s)
  const reviewsTrack = document.getElementById('reviewsSliderTrack');
  const reviewsWindow = document.getElementById('reviewsSliderWindow');
  const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
  const reviewsNextBtn = document.getElementById('reviewsNextBtn');
  const reviewsDots = document.getElementById('reviewsDots');

  if (reviewsTrack && reviewsWindow) {
    const reviewCards = Array.from(reviewsTrack.children);
    let currentReviewIndex = 0;
    let reviewAutoplayTimer = null;

    function getReviewVisibleCount() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    }

    function getReviewMaxIndex() {
      return Math.max(0, reviewCards.length - getReviewVisibleCount());
    }

    function renderReviewDots() {
      if (!reviewsDots) return;
      reviewsDots.innerHTML = '';
      const totalDots = getReviewMaxIndex() + 1;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = `review-dot ${i === currentReviewIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => jumpToReview(i));
        reviewsDots.appendChild(dot);
      }
    }

    function updateReviewPosition() {
      if (!reviewCards.length) return;
      const cardWidth = reviewCards[0].getBoundingClientRect().width;
      const isMobile = window.innerWidth <= 600;
      const isTablet = window.innerWidth <= 992;
      const gap = isMobile ? 0 : (isTablet ? 24 : 32); // 1.5rem / 2rem gap
      const offset = currentReviewIndex * (cardWidth + gap);
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      reviewsTrack.style.transform = `translateX(${isRtl ? offset : -offset}px)`;

      if (reviewsDots) {
        const dots = Array.from(reviewsDots.children);
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentReviewIndex);
        });
      }
    }

    function jumpToReview(index) {
      const maxIndex = getReviewMaxIndex();
      if (index > maxIndex) {
        currentReviewIndex = 0;
      } else if (index < 0) {
        currentReviewIndex = maxIndex;
      } else {
        currentReviewIndex = index;
      }
      updateReviewPosition();
    }

    function nextReview() {
      jumpToReview(currentReviewIndex + 1);
    }

    function prevReview() {
      jumpToReview(currentReviewIndex - 1);
    }

    function startReviewAutoplay() {
      stopReviewAutoplay();
      reviewAutoplayTimer = setInterval(nextReview, 4000); // Auto change every 4s
    }

    function stopReviewAutoplay() {
      if (reviewAutoplayTimer) clearInterval(reviewAutoplayTimer);
    }

    reviewsNextBtn?.addEventListener('click', () => {
      nextReview();
      startReviewAutoplay();
    });

    reviewsPrevBtn?.addEventListener('click', () => {
      prevReview();
      startReviewAutoplay();
    });

    reviewsWindow.addEventListener('mouseenter', stopReviewAutoplay);
    reviewsWindow.addEventListener('mouseleave', startReviewAutoplay);

    window.addEventListener('resize', () => {
      renderReviewDots();
      jumpToReview(Math.min(currentReviewIndex, getReviewMaxIndex()));
    });

    renderReviewDots();
    updateReviewPosition();
    startReviewAutoplay();
  }

  // 9. Card Click Navigation to Detailed Service Page
  document.querySelectorAll('.product-card, .collection-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;
      const targetUrl = card.querySelector('a')?.getAttribute('href') || 'contact.html';
      window.location.href = targetUrl;
    });
  });
});

// 10. Password Visibility Toggle Function
window.togglePasswordVisibility = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';

  if (btn) {
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    btn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
    btn.innerHTML = isPassword
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
  }
};

