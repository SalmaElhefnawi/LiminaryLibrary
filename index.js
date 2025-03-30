

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