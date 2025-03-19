// order_confirmation.js

// 🖨 Print Receipt Function
document.getElementById("print-receipt").addEventListener("click", function () {
    window.print();
});

// 📋 Copy Order Details to Clipboard
document.getElementById("copy-details").addEventListener("click", function () {
    const orderDetails = document.getElementById("order-details").innerText;
    navigator.clipboard.writeText(orderDetails).then(() => {
        alert("Order details copied to clipboard!");
    });
});

// ⏳ Estimated Delivery Countdown
function updateCountdown() {
    const deliveryDate = new Date("2025-03-22"); // Change to actual delivery date
    const now = new Date();
    const diffTime = deliveryDate - now;
    
    if (diffTime > 0) {
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById("delivery-countdown").innerText = `📦 Estimated Delivery: ${daysLeft} days left!`;
    } else {
        document.getElementById("delivery-countdown").innerText = "📦 Your package is arriving soon!";
    }
}

// Call countdown function when the page loads
window.onload = updateCountdown;
