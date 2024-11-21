// Function to open the sidebar
function openSidebar() {
    // Add the 'active' class to the sidebar which will trigger the transition
    document.getElementById("sidebar").classList.add("active");
    // Adjust the margin of the main content to make space for the sidebar
    document.querySelector(".main-content").style.marginLeft = "250px";
}

// Function to close the sidebar
function closeSidebar() {
    // Remove the 'active' class to hide the sidebar
    document.getElementById("sidebar").classList.remove("active");
    // Reset the margin of the main content
    document.querySelector(".main-content").style.marginLeft = "0";
}



let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const carouselContainer = document.querySelector('.carousel');

// Function to change slide
function changeSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;  // Slide images within container
    updateDots();
}

// Function to update the active dot
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Function for dot click navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;  // Jump to clicked image
        updateDots();
    });
});

// Automatically change slides every 5 seconds
setInterval(changeSlide, 5000);

// Initialize the first dot as active
updateDots();

const items = ["CAKES", "ICE CREAM", "BAKED GOODS", "CHILLED ITEMS"];
let currentPhraseIndex = 0;
const shopForText = document.getElementById("shopForText");

// Function to change text after fade-out
function changeText() {
    // Fade-out happens halfway through the animation (1 second in this case)
    shopForText.style.opacity = 0;

    // Wait for the fade-out to complete before updating text
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % items.length; // Cycle through items
        shopForText.textContent = items[currentIndex]; // Update the text content
        shopForText.style.opacity = 1; // Fade back in
    }, 1500); // Match the fade-out timing
}

// Change the text every 2 seconds (to match animation duration)
setInterval(changeText, 3000); // 2000ms = 2 seconds
