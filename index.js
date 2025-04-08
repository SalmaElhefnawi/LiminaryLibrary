

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

        let currentAngle = 0;
const carousel = document.getElementById('categoryCarousel');

function rotateCarousel(direction) {
  currentAngle += direction * 120; // 120° per card (360°/3)
  carousel.style.transform = `rotateY(${currentAngle}deg)`;
  
  // Optional: Add active class to center book
  const books = document.querySelectorAll('.carousel-book');
  books.forEach((book, index) => {
    book.classList.toggle('active', index === (-currentAngle/120) % 3);
  });
}

