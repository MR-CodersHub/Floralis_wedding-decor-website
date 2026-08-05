/* ==========================================================================
   FLORIST & WEDDING DECORATION - FORM VALIDATION & TOAST JAVASCRIPT
   Contact, Booking & Newsletter Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Toast Notification Helper
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'custom-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: ${type === 'success' ? '#2E7D32' : '#D32F2F'};
        color: #FFFFFF;
        padding: 0.9rem 2rem;
        border-radius: 999px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-weight: 600;
        font-size: 0.95rem;
        z-index: 4000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.6rem;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        ${type === 'success' 
          ? '<path d="M20 6L9 17l-5-5"/>' 
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
      </svg>
      <span>${message}</span>
    `;

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4000);
  }

  // Generic Field Validator
  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;

    let isValid = true;
    const value = input.value.trim();

    if (input.hasAttribute('required') && !value) {
      isValid = false;
    } else if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (input.type === 'tel' && value) {
      const phoneRegex = /^[0-9\-\+\s\(\)]{7,}$/;
      isValid = phoneRegex.test(value);
    }

    if (!isValid) {
      group.classList.add('error');
    } else {
      group.classList.remove('error');
    }

    return isValid;
  }

  // Handle Contact & Booking Form Submissions
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Real-time blur validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.form-group')?.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let formIsValid = true;

      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        if (form.classList.contains('newsletter-form')) {
          showToast('Thank you! You are subscribed for 10% off your first order.');
          form.reset();
        } else {
          showToast('Thank you! Your request has been sent. We will contact you shortly.');
          form.reset();
        }
      } else {
        showToast('Please fix the errors in the form before submitting.', 'error');
      }
    });
  });
});
