document.addEventListener("DOMContentLoaded", () => {
    const loginRadio = document.getElementById("login");
    const signupRadio = document.getElementById("signup");

    const loginTab = document.querySelector(".login-tab");
    const signupTab = document.querySelector(".signup-tab");

    const loginForm = document.querySelector(".login-form");
    const signupForm = document.querySelector(".signup-form");

    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    const closeModal = document.querySelector(".close-btn");

    // Tab switching logic
    loginTab.addEventListener("click", () => {
        loginRadio.checked = true;
        toggleForms();
    });

    signupTab.addEventListener("click", () => {
        signupRadio.checked = true;
        toggleForms();
    });

    function toggleForms() {
        if (loginRadio.checked) {
            loginForm.style.display = "flex";
            signupForm.style.display = "none";
            loginTab.classList.add("active");
            signupTab.classList.remove("active");
        } else {
            signupForm.style.display = "flex";
            loginForm.style.display = "none";
            signupTab.classList.add("active");
            loginTab.classList.remove("active");
        }
    }

    toggleForms(); // Initialize

    // Optional: Password toggle (for both forms)
    document.querySelectorAll(".toggle-password").forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.textContent = "🙈";
            } else {
                input.type = "password";
                this.textContent = "👁️";
            }
        });
    });

    // Optional: Basic client-side validation
    document.querySelector(".signup-form").addEventListener("submit", e => {
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;

        if (!email.includes("@") || password.length < 6) {
            e.preventDefault();
            alert("Please enter a valid email and a password with at least 6 characters.");
        }
    });


        // Switch forms using text links
        const switchToLogin = document.getElementById("switch-to-login");
        const switchToSignup = document.getElementById("switch-to-signup");
    
        if (switchToLogin && switchToSignup) {
            switchToLogin.addEventListener("click", (e) => {
                e.preventDefault();
                loginRadio.checked = true;
                toggleForms();
            });
    
            switchToSignup.addEventListener("click", (e) => {
                e.preventDefault();
                signupRadio.checked = true;
                toggleForms();
            });
        }

    function showSuccessModal(message) {
        successMessage.textContent = message;
        successModal.style.display = "flex"; 
    }

    closeModal.addEventListener("click", () => {
        successModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === successModal) {
            successModal.style.display = "none";
        }
    });



    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Assuming login is successful
        showSuccessModal("Login Successful! 🎉");
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Assuming signup is successful
        showSuccessModal("Signup Successful! 🎉");
    });
    
});
