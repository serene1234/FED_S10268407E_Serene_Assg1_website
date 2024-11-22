// Function to open the sidebar
function openSidebar() {
    // Add the 'active' class to the sidebar which will trigger the transition
    document.getElementById("sidebar").classList.add("sidebar-active");
    // Add a scaling effect to the main content
    const mainContent = document.querySelector(".main-content");
    mainContent.style.opacity = "0.8"; // Optional: dim the content
    mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
}

// Function to close the sidebar
function closeSidebar() {
    // Remove the 'active' class to hide the sidebar
    document.getElementById("sidebar").classList.remove("sidebar-active");
    // Reset the margin of the main content
    const mainContent = document.querySelector(".main-content");
    mainContent.style.opacity = "1";
    mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
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


// sample list of product nammes
const product = [
    "Cakes - Caramel Butter Cream Cake",
    "Cakes - Strawberry Fresh Cream Cake",
    "Cakes - Tiramisu Mille Crepe Cake",
    "Cakes - Gateau Chocolate Bar Cake",
    "Cakes - White Peach Cake",
    "Cakes - White Zebra Mille Crepe Cake",
    "Ice Cream - Dessert Monaka Salted Caramel",
    "Ice Cream - Warabi Mochi and Kinako Ice Bar",
    "Ice Cream - Dessert Monaka Setouchi Lemon Tart",
    "Ice Cream - Monaka Opera",
    "Ice Cream - Amaou Strawberry Soft Serve",
    "Ice Cream - Monaka Gateau Fraise",
    "Chilled Items - Strawberry Milk Pudding",
    "Chilled Items - White Peach Jelly Cup",
    "Chilled Items - Warabi Mochi Uji Matcha",
    "Chilled Items - Fluffy Cream Roll Uji Matcha",
    "Chilled Items - Chocolate Cream Puff",
    "Chilled Items - Yamanashi Pione Jelly Glass",
    "Baked Goods - Gateau au Fromage",
    "Baked Goods - Chocolate Flavored Longevity Ring Gift Box (4pcs)",
    "Baked Goods - Brownie Box (6pcs)",
    "Baked Goods - Chocolate Ganache Pie",
    "Baked Goods - Hokkaido Red Bean Mochi Pie",
    "Baked Goods - Italian Chestnut Cake",
];

// Search bar filtering function
function filterSuggestions() {
    const input = document.getElementById("search-bar").value.toLowerCase();
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (input.length > 0) {
        // Filter the product list based on input
        const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(input)
        );

        // Display filtered suggestions
        filteredProducts.forEach((product, index) => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = product;

            // Apply a unique class to the first suggestion
            if (index === 0) {
                suggestionItem.classList.add("first-suggestion");
            }

            suggestionItem.onclick = () => selectSuggestion(product);
            suggestionsList.appendChild(suggestionItem);
        });
    }
}

function selectSuggestion(product) {
    document.getElementById("search-bar").value = product; // Set the selected product in the search bar
    document.getElementById("suggestions-list").innerHTML = ""; // Clear suggestions
}