// Simple JavaScript for newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    if(email) {
        alert('Thank you for subscribing to our newsletter!');
        this.querySelector('input').value = '';
    } else {
        alert('Please enter a valid email address');
    }
});

// Book hover effect enhancement
const bookCards = document.querySelectorAll('.book-card');
bookCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});
// Redirect to book details page on click
bookCards.forEach(card => {
    card.addEventListener('click', function() {
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const openPopupBtn = document.getElementById('openPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    // Open popup
    openPopupBtn.addEventListener('click', function() {
        popupOverlay.classList.add('active');
    });

    // Close popup
    closePopupBtn.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        contactForm.reset();
        hideErrors();
        successMessage.style.display = 'none';
    });

    // Close popup when clicking outside
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            contactForm.reset();
            hideErrors();
            successMessage.style.display = 'none';
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Simulate form submission
            setTimeout(() => {
                successMessage.style.display = 'block';
                contactForm.reset();
                hideErrors();
            }, 500);
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError(nameError, true);
            isValid = false;
        } else {
            showError(nameError, false);
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError(emailError, true);
            isValid = false;
        } else {
            showError(emailError, false);
        }
        
        // Phone validation
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[+]?[0-9]{10,}$/;
        if (!phone || !phoneRegex.test(phone)) {
            showError(phoneError, true);
            isValid = false;
        } else {
            showError(phoneError, false);
        }
        
        // Message validation
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError(messageError, true);
            isValid = false;
        } else {
            showError(messageError, false);
        }
        
        return isValid;
    }

    // Helper functions
    function showError(element, show) {
        element.classList.toggle('show', show);
    }

    function hideErrors() {
        nameError.classList.remove('show');
        emailError.classList.remove('show');
        phoneError.classList.remove('show');
        messageError.classList.remove('show');
    }
});
