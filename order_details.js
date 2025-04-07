// book_details.js - Handles book details page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample book data (in a real app, this would come from an API or shared data file)
    const bookData = {
        'atomic-habits': {
            title: "Atomic Habits",
            author: "James Clear",
            price: 16.99,
            originalPrice: 22.99,
            image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
            description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
            published: "October 2018",
            pages: "320",
            rating: 4.8,
            reviews: 50000
        },
        'win-friends': {
            title: "How to Win Friends & Influence People",
            author: "Dale Carnegie",
            price: 12.99,
            originalPrice: 18.99,
            image: "https://m.media-amazon.com/images/I/71huv2eUZBL.jpg",
            description: "For over 80 years, this classic has taught millions the fundamental techniques for handling people, winning friends, and influencing others while avoiding conflict.",
            published: "1936",
            pages: "291",
            rating: 4.7,
            reviews: 100000
        }
    };

    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book');
    
    if (bookId && bookData[bookId]) {
        loadBookDetails(bookData[bookId]);
        initBookEffects();
    } else {
        // Redirect to book listing if no valid book ID
        window.location.href = 'booklist.html';
    }

    function loadBookDetails(book) {
        // Update page content
        document.title = `${book.title} | Luminary Library`;
        
        // Update book info
        document.querySelector('.book-header h1').textContent = book.title;
        document.querySelector('.book-header h2').textContent = `by ${book.author}`;
        document.querySelector('.current-price').textContent = `$${book.price.toFixed(2)}`;
        document.querySelector('.original-price').textContent = `$${book.originalPrice.toFixed(2)}`;
        document.querySelector('.book-description p').textContent = book.description;
        
        // Update rating
        const starsContainer = document.querySelector('.stars');
        starsContainer.innerHTML = '';
        const fullStars = Math.floor(book.rating);
        const hasHalfStar = book.rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            starsContainer.innerHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsContainer.innerHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        document.querySelector('.review-count').textContent = `(${book.reviews.toLocaleString()} reviews)`;
        
        // Update meta info
        const metaItems = document.querySelectorAll('.meta-item');
        metaItems[0].querySelector('span').textContent = `Published: ${book.published}`;
        metaItems[1].querySelector('span').textContent = `Pages: ${book.pages}`;
        
        // Update book cover images
        document.querySelector('.cover-front img').src = book.image;
        document.querySelector('.back-content h3').textContent = book.title.toUpperCase();
    }

    function initBookEffects() {
        const book3d = document.querySelector('.book-3d');
        const bookCover = document.querySelector('.book-cover');
        
        if (!book3d || !bookCover) {
            console.error("Book 3D elements not found!");
            return;
        }
        
        // Mouse move effect for 3D book
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            book3d.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            bookCover.style.transform = `rotateY(${xAxis * 1.5}deg) rotateX(${yAxis * 1.5}deg)`;
        });
        
        // Reset position when mouse leaves
        document.addEventListener('mouseleave', () => {
            book3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
            bookCover.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
        
        // Add to cart button effect
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                this.style.backgroundColor = '#2a7f2a';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.backgroundColor = '';
                }, 2000);
            });
        }
        
        // Wishlist button effect
        const wishlistBtn = document.querySelector('.wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                
                if (this.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i> Wishlist';
                }
            });
        }
        
        // Book flip animation
        book3d.addEventListener('click', function() {
            const currentTransform = bookCover.style.transform;
            bookCover.style.transform = currentTransform.includes('180deg') ? 
                'rotateY(0deg)' : 'rotateY(180deg)';
        });
    }
});



  fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const books = data.books;
    // Render books...
  });