// This should be included in both booklist.html and book_details.html
document.addEventListener('DOMContentLoaded', function() {
    // Handle book item clicks
    const bookItems = document.querySelectorAll('.book-item');
    
    bookItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't navigate if clicking on something inside the link
            if (e.target.closest('a')) return;
            
            const bookId = this.getAttribute('data-book-id');
            window.location.href = `book_details.html?book=${bookId}`;
        });
    });

    // On book details page - load the correct book
    if (document.querySelector('.book-details')) {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('book');
        
        if (bookId) {
            loadBookDetails(bookId);
        }
    }
});

function loadBookDetails(bookId) {
    // This would typically be an API call in a real application
    // For now we'll use a simple switch case
    switch(bookId) {
        case 'atomic-habits':
            document.title = "Atomic Habits - Book Details";
            // Set all content for Atomic Habits
            break;
            
        case 'win-friends':
            document.title = "How to Win Friends - Book Details";
            // Set all content for How to Win Friends
            break;
            
        default:
            // Handle unknown book IDs
            break;
    }
}