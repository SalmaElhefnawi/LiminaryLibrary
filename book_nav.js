document.addEventListener('DOMContentLoaded', function() {
    // Initialize the book details page
    initBookPage();
});

function initBookPage() {
    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book') || 'atomic-habits'; // Default book
    
    try {
        // Load book data and initialize page
        const bookData = fetchBookData(bookId);
        renderBookDetails(bookData);
        initBookInteractions(bookData);
    } catch (error) {
        console.error('Error initializing book page:', error);
        // Fallback to default book or show error message
        const defaultBook = fetchBookData('atomic-habits');
        renderBookDetails(defaultBook);
        showErrorNotification();
    }
}

function fetchBookData(bookId) {
    // In a real app, this would be an API call
    // For now, we'll use a data object
    const bookDatabase = {
        'atomic-habits': {
            id: 'atomic-habits',
            title: "Atomic Habits",
            author: "James Clear",
            price: 16.99,
            originalPrice: 22.99,
            image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
            description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
            published: "October 2018",
            pages: "320",
            rating: 4.8,
            reviews: 50000,
            genre: "Self-Improvement",
            language: "English"
        }
        // Add more books as needed
    };

    const book = bookDatabase[bookId];
    if (!book) {
        throw new Error(`Book with ID ${bookId} not found`);
    }
    return book;
}

function renderBookDetails(book) {
    // Update page title
    document.title = `${book.title} | Luminary Library`;
    
    // Update book cover
    const bookImage = document.querySelector('.book-image');
    if (bookImage) {
        bookImage.src = book.image;
        bookImage.alt = `${book.title} Cover`;
    }
    
    // Update text details
    setElementText('.book-header h1', book.title);
    setElementText('.book-header h2', `by ${book.author}`);
    setElementText('.book-description p', book.description);
    
    // Update pricing
    setElementText('.current-price', `$${book.price.toFixed(2)}`);
    setElementText('.original-price', `$${book.originalPrice.toFixed(2)}`);
    
    // Update rating
    renderRatingStars('.stars', book.rating);
    setElementText('.rating span', `${book.rating} (${book.reviews.toLocaleString()}+ reviews)`);
    
    // Update meta information
    setElementText('.meta-item:nth-child(1) span', `Published: ${book.published}`);
    setElementText('.meta-item:nth-child(2) span', `Pages: ${book.pages}`);
    setElementText('.meta-item:nth-child(3) span', `Language: ${book.language}`);
    setElementText('.meta-item:nth-child(4) span', `Genre: ${book.genre}`);
    
    // Update back cover if exists
    setElementText('.back-content h3', book.title.toUpperCase());
    setElementText('.price-tag', `$${book.price.toFixed(2)}`);
}

function initBookInteractions(book) {
    // Initialize cart functionality
    initCartSystem(book);
    
    // Initialize wishlist
    initWishlist();
    
    // Initialize social sharing
    initSocialSharing(book);
    
    // Initialize any other book-specific interactions
}

// Helper functions
function setElementText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
}

function renderRatingStars(selector, rating) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    container.innerHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        if (i < fullStars) {
            star.style.color = 'var(--star-gold)';
        } else if (i === fullStars && hasHalfStar) {
            star.className = 'fas fa-star-half-alt';
            star.style.color = 'var(--star-gold)';
        } else {
            star.style.color = '#ddd';
        }
        container.appendChild(star);
    }
}

function showErrorNotification() {
    // You could implement a more visible error message
    console.error('Failed to load book details');
    // Optionally show a user notification:
    // Swal.fire('Error', 'Could not load book details', 'error');
}