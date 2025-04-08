const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupOverlay = document.getElementById('popupOverlay');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

openPopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closePopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
});

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrors();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (name === '') {
        showError('nameError');
        isValid = false;
    }
    if (phone === '') {
        showError('phoneError');
        isValid = false;
    }
    if (email === '' || !isValidEmail(email)) {
        showError('emailError');
        isValid = false;
    }
    if (message === '') {
        showError('messageError');
        isValid = false;
    }

    if (isValid) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        setTimeout(() => {
            popupOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        }, 3000);
    }
});

function showError(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.style.display = 'none');
}

function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.style.display = 'none';
    resetErrors();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
