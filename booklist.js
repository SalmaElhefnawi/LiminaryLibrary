document.addEventListener('DOMContentLoaded', function() {
    // Sample book data
    const books = [
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price: 14.99,
            category: "fiction",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Educated",
            author: "Tara Westover",
            price: 12.99,
            category: "non-fiction",
            image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "101 Essays That Will Change The Way You Think",
            author: "Brianna Wiest",
            price: 9.99,
            category: "self-improvement",
            image: "https://m.media-amazon.com/images/I/41%2B0g1j7JLL._SY425_.jpg"
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            price: 11.99,
            category: "self-improvement",
            image: "https://m.media-amazon.com/images/I/51xwGSNX-EL._SY425_.jpg"
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            price: 13.99,
            category: "academia",
            image: "https://m.media-amazon.com/images/I/41d1gVUK1yL._SY425_.jpg"
        },
        {
            title: "The Road to Mecca",
            author: "Muhammad Asad",
            price: 18.95,
            category: "islam",
            image: "https://m.media-amazon.com/images/I/41K+MCxTuRL._SY425_.jpg"
        },
        {
            title: "The Midnight Library",
            author: "Matt Haig",
            price: 16.99,
            category: "fiction",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Where the Crawdads Sing",
            author: "Delia Owens",
            price: 15.99,
            category: "fiction",
            image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const booksList = document.querySelector('.books-list');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const applySortBtn = document.getElementById('apply-sort');

    // Display all books initially
    displayBooks(books);

    // Filter function
    applyFiltersBtn.addEventListener('click', function() {
        const categoryFilter = document.getElementById('category-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        
        const filteredBooks = books.filter(book => {
            // Category filter
            const categoryMatch = !categoryFilter || book.category.includes(categoryFilter);
            
            // Price filter
            let priceMatch = true;
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(Number);
                if (priceFilter.endsWith('+')) {
                    priceMatch = book.price >= min;
                } else {
                    priceMatch = book.price >= min && book.price <= max;
                }
            }
            
            // Search filter
            const searchMatch = !searchInput || 
                              book.title.toLowerCase().includes(searchInput) || 
                              book.author.toLowerCase().includes(searchInput);
            
            return categoryMatch && priceMatch && searchMatch;
        });
        
        displayBooks(filteredBooks);
    });
    
    // Sort function
    applySortBtn.addEventListener('click', function() {
        const sortBy = document.getElementById('sort-by').value;
        const currentBooks = Array.from(document.querySelectorAll('.book-item'));
        const bookData = currentBooks.map(bookEl => {
            return {
                element: bookEl,
                title: bookEl.querySelector('.book-title').textContent.toLowerCase(),
                author: bookEl.querySelector('.book-author').textContent.toLowerCase(),
                price: parseFloat(bookEl.querySelector('.book-price').textContent.replace('$', ''))
            };
        });
        
        bookData.sort((a, b) => {
            switch(sortBy) {
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'author-asc':
                    return a.author.localeCompare(b.author);
                case 'author-desc':
                    return b.author.localeCompare(a.author);
                default:
                    return 0;
            }
        });
        
        // Re-append sorted books
        bookData.forEach(({element}) => {
            booksList.appendChild(element);
        });
    });

    // Function to display books
    function displayBooks(booksToDisplay) {
        booksList.innerHTML = '';
        
        if (booksToDisplay.length === 0) {
            booksList.innerHTML = '<p class="no-books">No books match your filters. Please try different criteria.</p>';
            return;
        }
        
        booksToDisplay.forEach(book => {
            const bookEl = document.createElement('div');
            bookEl.className = 'book-item';
            bookEl.innerHTML = `
                <div class="book-image" style="background-image: url('${book.image}')"></div>
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-price">$${book.price.toFixed(2)}</p>
                    <span class="book-category">${formatCategory(book.category)}</span>
                </div>
            `;
            booksList.appendChild(bookEl);
        });
    }
    
    // Format category for display
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Initialize with all books displayed
    displayBooks(books);
});
 