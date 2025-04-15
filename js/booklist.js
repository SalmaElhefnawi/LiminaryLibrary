document.addEventListener('DOMContentLoaded', function() {
    // Sample book data
    const books = [
        {
            title: "Web Development with Node and Express",
            author: "Ethan Brown",
            price: 500,
            category: "fiction",
            image: "../images/WebBook.jpg",
            rating: 4.5 // out of 5 
        },
        {
            title: "Educated",
            author: "Tara Westover",
            price: 12.99,
            category: "non-fiction",
            image: "../images/educated.jpg",
            rating: 4.7 // out of 5
        },
        {
            title: "101 Essays That Will Change The Way You Think",
            author: "Brianna Wiest",
            price: 9.99,
            category: "self-improvement",
            image: "../images/101Essays.jpg",
            rating: 4.6 // out of 5
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            price: 11.99,
            category: "self-improvement",
            image: "../images/AtomicHabits.jpg",
            rating: 4.8 // out of 5
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            price: 13.99,
            category: "academia",
            image: "../images/Acadamia.jpg",
            rating: 4.4 // out of 5 
        },
        {
            title: "The Road to Mecca",
            author: "Muhammad Asad",
            price: 18.95,
            category: "islam",
            image: "../images/roadtomeca.jpg",
            rating: 4.5 // out of 5 
        },
        {
            title: "The Midnight Library",
            author: "Matt Haig",
            price: 16.99,
            category: "fiction",
            image: "../images/WebBook.jpg",
            rating: 4.3 // out of 5 
        },
        {
            title: "Where the Crawdads Sing",
            author: "Delia Owens",
            price: 15.99,
            category: "fiction",
            image: "../images/WebBook.jpg",
            rating: 4.6 // out of 5 
        }
    ];

    const booksList = document.querySelector('.books-list');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const applySortBtn = document.getElementById('apply-sort');
    const categoryFilter = document.getElementById('category-filter');

    // Function to apply filters
    function applyFilters() {
        const categoryFilter = document.getElementById('category-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        
        const filteredBooks = books.filter(book => {
            // Category filter - use exact match
            const categoryMatch = !categoryFilter || book.category === categoryFilter;
            
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
    }

    // Add click event listener for the filter button
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Check for category parameter in URL and apply filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        categoryFilter.value = categoryParam;
        // Apply filters immediately
        applyFilters();
    } else {
        // Display all books initially if no category parameter
        displayBooks(books);
    }

    // Sort function
    applySortBtn.addEventListener('click', function() {
        const sortBy = document.getElementById('sort-by').value;
        const currentBooks = Array.from(document.querySelectorAll('.book-item'));
        const bookData = currentBooks.map(bookEl => {
            return {
                element: bookEl,
                title: bookEl.querySelector('.book-title').textContent.toLowerCase(),
                author: bookEl.querySelector('.book-author').textContent.toLowerCase(),
                price: parseFloat(bookEl.querySelector('.book-price').textContent.replace('EGP', ''))
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
                    <div class="star-rating">
                        ${generateStarRating(book.rating)}
                    </div>
                    <p class="book-price">EGP ${book.price.toFixed(2)}</p>
                    <span class="book-category">${formatCategory(book.category)}</span>
                </div>
            `;
            booksList.appendChild(bookEl);
        });
    }

    // generateStarRating function 
    function generateStarRating(rating) {
        let stars = '';
        // Round to nearest half-star
        const roundedRating = Math.round(rating * 2) / 2;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars += `<i class="fas fa-star"></i>`;
            } else if (i - 0.5 === roundedRating) {
                stars += `<i class="fas fa-star-half-alt"></i>`;
            } else {
                stars += `<i class="far fa-star"></i>`;
            }
        }
        return stars;
    }

    // Format category for display
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
});

 
