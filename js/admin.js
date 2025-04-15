// Sample data for the dashboard with classic literature books
const dashboardData = {
    totalBooks: 28,  
    totalCustomers: 43,
    totalOrders: 56,
    totalRevenue: 2450,
    recentOrders: [
        {
            id: "#ORD-001",
            customer: "Salma",
            books: ["Read. Grow. Thrive."],
            amount: 45.99,
            status: "completed"
        },
        {
            id: "#ORD-002",
            customer: "Basma",
            books: ["War and Peace", "Anna Karenina"],
            amount: 32.50,
            status: "pending"
        },
        {
            id: "#ORD-003",
            customer: "Yasmen",
            books: ["Atomic Habits"],
            amount: 11.99,
            status: "completed"
        },
        {
            id: "#ORD-004",
            customer: "Malak",
            books: ["Dead Souls", "The Overcoat"],
            amount: 28.75,
            status: "completed"
        },
        {
            id: "#ORD-005",
            customer: "Jana",
            books: ["101 Essays That Will Change The Way You Think"],
            amount: 12.99,
            status: "cancelled"
        }
    ],
    topBooks: [
        {
            title: "Crime and Punishment",
            author: "Fyodor Dostoevsky",
            price: 12.99,
            sales: 245
        },
        {
            title: "War and Peace",
            author: "Leo Tolstoy",
            price: 14.99,
            sales: 198
        },
        {
            title: "Anna Karenina",
            author: "Leo Tolstoy",
            price: 10.99,
            sales: 176
        },
        {
            title: "The Brothers Karamazov",
            author: "Fyodor Dostoevsky",
            price: 9.99,
            sales: 154
        },
        {
            title: "Dead Souls",
            author: "Nikolai Gogol",
            price: 15.99,
            sales: 132
        }
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update summary cards
    document.getElementById('total-books').textContent = dashboardData.totalBooks.toLocaleString();
    document.getElementById('total-customers').textContent = dashboardData.totalCustomers.toLocaleString();
    document.getElementById('total-orders').textContent = dashboardData.totalOrders.toLocaleString();
    document.getElementById('total-revenue').textContent = '$' + dashboardData.totalRevenue.toLocaleString();
    
    // Populate recent orders table
    const ordersTable = document.querySelector('#orders-table tbody');
    dashboardData.recentOrders.forEach(order => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.books.join(', ')}</td>
            <td>$${order.amount.toFixed(2)}</td>
            <td><span class="status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td><button class="action-btn">View</button></td>
        `;
        
        ordersTable.appendChild(row);
    });
    
    // Populate top books table (without cover images)
    const booksTable = document.querySelector('#books-table tbody');
    dashboardData.topBooks.forEach(book => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>${book.sales}</td>
        `;
        
        booksTable.appendChild(row);
    });
    
    // Menu item click event
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        alert(`Searching for: ${searchTerm}`);
        // In a real app, you would filter data or make an API call here
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            alert(`Searching for: ${searchTerm}`);
            // In a real app, you would filter data or make an API call here
        }
    });
});