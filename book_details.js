document.addEventListener('DOMContentLoaded', function () {
    // Sample book data
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
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book') || 'atomic-habits';

    if (bookId && bookData[bookId]) {
        loadBookDetails(bookData[bookId]);
        initBookEffects();
    }

    function loadBookDetails(book) {
        console.log("Loading book details for:", book.title);
        // Your implementation
    }

    function initBookEffects() {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        const increaseBtn = document.querySelector('.increase-btn');
        const decreaseBtn = document.querySelector('.decrease-btn');
        const qtyInput = document.querySelector('.qty-input');
        const maxQty = 10;

        increaseBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyInput.value);
            if (currentQty < maxQty) {
                qtyInput.value = currentQty + 1;
                updateCartQuantity(bookId, currentQty + 1);
            }
        });

        decreaseBtn.addEventListener('click', function () {
            let currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
                updateCartQuantity(bookId, currentQty - 1);
            }
        });

        function updateCartQuantity(bookId, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || {};
            if (cart[bookId]) {
                cart[bookId].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }

        const addToCartBtn = document.querySelector('.btn-primary');
        const removeFromCartBtn = document.querySelector('.remove-from-cart');

        if (cart[bookId]) {
            addToCartBtn.style.display = 'none';
            removeFromCartBtn.style.display = 'flex';
        }

        addToCartBtn.addEventListener('click', function () {
            cart[bookId] = {
                title: bookData[bookId].title,
                price: bookData[bookId].price,
                image: bookData[bookId].image,
                quantity: 1
            };
            localStorage.setItem('cart', JSON.stringify(cart));

            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            this.style.backgroundColor = '#2a7f2a';

            removeFromCartBtn.style.display = 'flex';
            this.style.display = 'none';

            Swal.fire({
                title: 'Added to Cart!',
                html: `
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <img src="${bookData[bookId].image}" style="width: 80px; border-radius: 5px; border: 2px solid #5a0017;">
                        <div>
                            <p style="margin: 0; font-weight: bold;">${bookData[bookId].title}</p>
                            <p style="margin: 5px 0 0; color: #5a0017;">$${bookData[bookId].price.toFixed(2)}</p>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonColor: '#5a0017',
                cancelButtonColor: '#7a1c2a',
                confirmButtonText: '<i class="fas fa-shopping-cart"></i> View Cart',
                cancelButtonText: '<i class="fas fa-book-open"></i> Continue Shopping',
                background: '#f5e6ea',
                focusConfirm: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'cart.html';
                }
                setTimeout(() => {
                    addToCartBtn.innerHTML = originalHTML;
                    addToCartBtn.style.backgroundColor = '';
                }, 2000);
            });
        });

        document.querySelector('.add-to-cart').addEventListener('click', function () {
            const quantity = parseInt(document.querySelector('.qty-input').value);
            console.log("Quantity added to cart:", quantity);
        });

        removeFromCartBtn.addEventListener('click', function () {
            Swal.fire({
                title: 'Remove from Cart?',
                html: `
                    <div style="text-align: center;">
                        <img src="${bookData[bookId].image}" style="width: 100px; border-radius: 5px; margin-bottom: 15px;">
                        <p>Remove <strong>${bookData[bookId].title}</strong> from your cart?</p>
                    </div>
                `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#7f8c8d',
                confirmButtonText: 'Remove',
                background: '#f5e6ea'
            }).then((result) => {
                if (result.isConfirmed) {
                    delete cart[bookId];
                    localStorage.setItem('cart', JSON.stringify(cart));

                    addToCartBtn.style.display = 'flex';
                    removeFromCartBtn.style.display = 'none';
                    addToCartBtn.innerHTML = 'Add to Cart';
                    addToCartBtn.style.backgroundColor = '';

                    Swal.fire({
                        title: 'Removed!',
                        text: 'Book removed from your cart',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#f5e6ea'
                    });
                }
            });
        });

        document.querySelectorAll('.social-share').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                const bookTitle = encodeURIComponent(bookData[bookId].title);
                const bookImage = encodeURIComponent(bookData[bookId].image); // Used in Pinterest sharing

                let shareUrl = '';

                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${bookUrl}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20"${bookTitle}"&url=${bookUrl}`;
                        break;
                    case 'pinterest':
                        shareUrl = `https://pinterest.com/pin/create/button/?url=${bookUrl}&media=${bookImage}&description=${bookTitle}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${bookTitle}&body=Check%20out%20this%20book:%20${bookUrl}`;
                        break;
                }

                window.open(shareUrl, '_blank', 'width=600,height=400');
            });
        });

        const wishlistBtn = document.querySelector('.btn-secondary');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function () {
                const isWishlisted = this.classList.toggle('wishlisted');
                const icon = this.querySelector('svg');

                if (isWishlisted) {
                    icon.innerHTML = '<path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>';
                    Swal.fire({
                        icon: 'success',
                        text: `We've saved "${bookData[bookId].title}" for you`,
                        timer: 1500,
                        background: '#f5e6ea'
                    });
                } else {
                    icon.innerHTML = '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>';
                    Swal.fire({
                        icon: 'info',
                        text: `Removed "${bookData[bookId].title}" from your list`,
                        timer: 1500,
                        background: '#f5e6ea'
                    });
                }
            });
        }
    }
});