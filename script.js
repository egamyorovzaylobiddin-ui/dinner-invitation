
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let noClickCount = 0;

const messages = [
    "Are you sure? 🥺",
    "Please think again! ❤️",
    "Don't break my heart! 💔",
    "Give me a chance! 🥹",
    "One more thought, please! 🌹",
    "I promise it will be special! ❤️"
];

function escapeButton() {
    noClickCount++;

    const messageIndex = Math.min(
        noClickCount - 1,
        messages.length - 1
    );

    // Show a romantic message
    alert(messages[messageIndex]);

    // Make button escape
    noBtn.style.position = "fixed";

    const padding = 25;

    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = padding + Math.random() * Math.max(0, maxX - padding);
    const randomY = padding + Math.random() * Math.max(0, maxY - padding);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Escape when mouse approaches
noBtn.addEventListener("mouseenter", escapeButton);

// Escape on mobile touch
noBtn.addEventListener("touchstart", function(event) {
    event.preventDefault();
    escapeButton();
}, { passive: false });

// Prevent clicking
noBtn.addEventListener("click", function(event) {
    event.preventDefault();
    escapeButton();
});

// YES button
yesBtn.addEventListener("click", function() {
    window.location.href = "dinner.html";
});

