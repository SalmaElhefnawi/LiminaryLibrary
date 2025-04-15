document.addEventListener('DOMContentLoaded', function () {
    const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistGrid = document.getElementById('wishlist-items');

    if (wishlistData.length > 0) {
        wishlistData.forEach(book => {
            const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('wishlist-item');
            wishlistItem.innerHTML = `
                <img src="${book.cover}" alt="Book Cover" class="wishlist-cover">
                <div class="wishlist-details">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                    <div class="wishlist-actions">
                        <button class="wishlist-btn add-to-cart" onclick="window.location.href='/cart.html'">Add to Cart</button>
                        <button class="wishlist-btn remove-item" onclick="removeWishlistItem(this)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            wishlistGrid.appendChild(wishlistItem);
        });
    } else {
        wishlistGrid.innerHTML = '<p>Your wishlist is empty.</p>';
    }

    const navItems = document.querySelectorAll('.dashboard-nav li[data-section]');
    const sections = document.querySelectorAll('.content-section');

    function activateSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(nav => nav.classList.remove('active'));

        const targetSection = document.getElementById(`${sectionId}-section`);
        const targetNav = document.querySelector(`.dashboard-nav li[data-section="${sectionId}"]`);

        if (targetSection) targetSection.classList.add('active');
        if (targetNav) targetNav.classList.add('active');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    activateSection(section || 'wishlist');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            activateSection(sectionId);
        });
    });

    window.removeWishlistItem = function (button) {
        if (confirm('Remove this item from your wishlist?')) {
            const item = button.closest('.wishlist-item');
            item.remove();

            const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
            const updatedWishlist = wishlistData.filter(book => book.title !== item.querySelector('h4').textContent);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

            if (updatedWishlist.length === 0) {
                wishlistGrid.innerHTML = '<p>Your wishlist is empty.</p>';
            }
        }
    };

    function logoutUser() {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('profile');
            localStorage.removeItem('wishlist');
            window.location.href = '/login.html';
        }
    }

    document.getElementById('logout-btn').addEventListener('click', logoutUser);

    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersSection = document.getElementById('orders-section');
    const ordersContainer = document.createElement('div');
    ordersContainer.classList.add('orders-container');

    if (ordersData.length > 0) {
        ordersData.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <h4>Order #${order.id}</h4>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <ul>
                    ${order.items.map(item => `<li>${item.quantity}x ${item.name}</li>`).join('')}
                </ul>
            `;
            ordersContainer.appendChild(orderItem);
        });
    } else {
        ordersContainer.innerHTML = '<p>You have no orders yet.</p>';
    }

    ordersSection.appendChild(ordersContainer);

    function updateProfileSummary() {
        const savedProfile = JSON.parse(localStorage.getItem('profile'));
        if (savedProfile) {
            document.querySelector('.profile-pic').src = savedProfile.profilePic || 'https://randomuser.me/api/portraits/women/44.jpg';
            document.querySelector('.profile-summary h3').textContent = savedProfile.name || 'Guest';
            document.querySelector('.member-since').textContent = `Member since: ${savedProfile.memberSince || 'Unknown'}`;
            document.querySelector('.profile-summary p:last-of-type').textContent = savedProfile.bio || 'No bio available.';
        }
    }

    updateProfileSummary();

    const profileForm = document.querySelector('.profile-form');
    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('profile-name').value.trim();
        const email = document.getElementById('profile-email').value.trim();
        const bio = document.getElementById('profile-bio').value.trim();
        const profilePic = 'https://randomuser.me/api/portraits/women/44.jpg';

        if (!name) {
            alert('Name is required.');
            return;
        }
        if (!email || !validateEmail(email)) {
            alert('A valid email is required.');
            return;
        }

        const profileData = {
            name,
            email,
            bio,
            profilePic,
            memberSince: new Date().toLocaleDateString()
        };
        localStorage.setItem('profile', JSON.stringify(profileData));

        updateProfileSummary();

        alert('Profile updated successfully!');
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});