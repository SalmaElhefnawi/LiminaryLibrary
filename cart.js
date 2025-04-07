// Sample book data
const books = [
    {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 14.99,
        category: "fiction",
        image: "images/book1.jpg", // Replace with your actual image path
        quantity: 1
    },
    {
        id: 2,
        title: "Educated",
        author: "Tara Westover",
        price: 12.99,
        category: "non-fiction",
        image: "images/book2.jpg", // Replace with your actual image path
        quantity: 2
    },
    {
        id: 3,
        title: "101 Essays That Will Change The Way You Think",
        author: "Brianna Wiest",
        price: 9.99,
        category: "self-improvement",
        image: "images/book3.jpg", // Replace with your actual image path
        quantity: 1
    }
];

// Recommended books data
const recommendedBooks = [
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        price: 11.99,
        category: "self-improvement",
        image: "images/book4.jpg" // Replace with your actual image path
    },
    {
        id: 5,
        title: "Deep Work",
        author: "Cal Newport",
        price: 13.99,
        category: "academia",
        image: "images/book5.jpg" // Replace with your actual image path
    },
    {
        id: 6,
        title: "The Road to Mecca",
        author: "Muhammad Asad",
        price: 18.95,
        category: "islam",
        image: "images/book6.jpg" // Replace with your actual image path
    },
    {
        id: 7,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 16.99,
        category: "fiction",
        image: "images/book7.jpg" // Replace with your actual image path
    }
];

// Initialize cart with sample data
let cart = [...books];

// DOM elements
const cartContainer = document.getElementById('cart-container');
const recommendationsContainer = document.getElementById('recommendations-container');
const notification = document.getElementById('notification');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's cart data in localStorage
    const savedCart = localStorage.getItem('luminaryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    updateCart();
    displayRecommendations();
});

// Update cart display
function updateCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-container">
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <h2>Your cart is empty</h2>
                    <p>Browse our collection to find your next favorite book</p>
                    <a href="booklist.html" class="continue-shopping">Continue Shopping</a>
                </div>
            </div>
        `;
        return;
    }

    // Calculate cart totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 35 ? 0 : 5.99; // Free shipping over $35
    const total = subtotal + tax + shipping;

    // Create cart HTML
    let cartHTML = `
        <div class="cart-container">
            <div class="cart-header">
                <div></div>
                <div>Book</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div></div>
            </div>
            <div class="cart-items">
    `;

    // Add each cart item
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div>
                    <img src="${item.image}" alt="${item.title}" class="item-image">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p>${item.author}</p>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <button class="quantity-btn decrease-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn increase-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <div>
                    <button class="remove-btn" onclick="removeItem(${item.id})"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `;
    });

    // Add cart summary
    cartHTML += `
        </div>
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%)</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping ${subtotal > 35 ? '(Free over $35)' : ''}</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            <a href="booklist.html" class="continue-shopping">Continue Shopping</a>
        </div>
    </div>
    `;

    cartContainer.innerHTML = cartHTML;
    
    // Save cart to localStorage
    saveCart();
}

// Display recommended books
function displayRecommendations() {
    let recommendationsHTML = `
        <h2>You May Also Like</h2>
        <div class="recommendations-grid">
    `;

    recommendedBooks.forEach(book => {
        recommendationsHTML += `
            <div class="recommendation-item">
                <div class="recommendation-image" style="background-image: url('${book.image}')"></div>
                <div class="recommendation-details">
                    <h3 class="recommendation-title">${book.title}</h3>
                    <p class="recommendation-author">${book.author}</p>
                    <p class="recommendation-price">$${book.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${book.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });

    recommendationsHTML += `</div>`;
    recommendationsContainer.innerHTML = recommendationsHTML;
}

// Update item quantity
function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[itemIndex].quantity <= 0) {
            removeItem(id);
            return;
        }
        
        updateCart();
    }
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    
    // Show notification
    notification.textContent = "Item removed from cart";
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add item to cart
function addToCart(id) {
    const book = recommendedBooks.find(book => book.id === id);
    if (book) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...book, quantity: 1});
        }
        
        updateCart();
        
        // Show notification
        notification.textContent = `"${book.title}" added to cart`;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('luminaryCart', JSON.stringify(cart));
}

// Proceed to checkout
function proceedToCheckout() {
    // In a real application, this would redirect to a checkout page
    alert('Proceeding to checkout...');
    // window.location.href = 'checkout.html';
}