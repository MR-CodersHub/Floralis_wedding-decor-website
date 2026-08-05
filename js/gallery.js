/* ==========================================================================
   FLORIST & WEDDING DECORATION - GALLERY & LIGHTBOX JAVASCRIPT
   Category Filter Tabs & Lightbox Modal Viewer
   ========================================================================== */

// Global Filter Function for Gallery Category Buttons
function filterGallery(category, btnElem) {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn, .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');

  galleryItems.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = '';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
}

// Global Lightbox Functions
function openLightbox(imgSrc, title, caption) {
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');

  if (lightboxImg && lightboxModal) {
    lightboxImg.src = imgSrc;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightboxModal = document.querySelector('.lightbox-modal');
  if (lightboxModal) {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxClose = document.querySelector('.lightbox-close');

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  window.closeLightbox = closeLightbox;
  window.openLightbox = openLightbox;
  window.filterGallery = filterGallery;
});

