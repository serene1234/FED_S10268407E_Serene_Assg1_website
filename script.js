// Automatically clear cart on page load (for testing purposes)
/*localStorage.removeItem('cart');
cart = [];
updateCartIndicator();*/

// Sidebar functions: These are global, so they run on all pages
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

// Function to initialize the carousel (only on the Home page)
function initializeCarousel() {
    const carouselContainer = document.querySelector('.carousel');
    if (!carouselContainer) return; // Stop if carousel is not present

    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

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
}

// Function to initialize the text-changing feature (only on pages where it's needed)
function initializeTextChange() {
    const shopForText = document.getElementById("shopForText");
    if (!shopForText) return; // Stop if the element is not present

    const items = ["CAKES", "ICE CREAM", "BAKED GOODS", "CHILLED ITEMS"];
    let currentIndex = 0;

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
}

// Search bar filtering and suggestion functionality
function initializeSearch() {
    const products = [
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

    const input = document.getElementById("search-bar");
    const suggestionsList = document.getElementById("suggestions-list");

    // Function to filter product suggestions based on input
    function filterSuggestions() {
        const query = input.value.toLowerCase();
        suggestionsList.innerHTML = ""; // Clear previous suggestions

        if (query.length > 0) {
            const filteredProducts = products.filter(product =>
                product.toLowerCase().includes(query)
            );

            filteredProducts.forEach((product, index) => {
                const suggestionItem = document.createElement("li");
                suggestionItem.textContent = product;
                if (index === 0) {
                    suggestionItem.classList.add("first-suggestion");
                }
                suggestionItem.onclick = () => selectSuggestion(product);
                suggestionsList.appendChild(suggestionItem);
            });
        }
    }

    // Function to select a suggestion
    function selectSuggestion(product) {
        input.value = product; // Set the selected product in the search bar
        suggestionsList.innerHTML = ""; // Clear suggestions
    }

    input.addEventListener("input", filterSuggestions); // Listen for input changes
}

// FAQ toggle functionality (only on Product page)
function initializeFAQToggle() {
    const faqRight = document.querySelector('.faq-right');
    if (!faqRight) return; // Stop if FAQ right is not present

    document.querySelectorAll('.faq-right details').forEach((detail) => {
        detail.addEventListener('toggle', function () {
            const icon = this.querySelector('.faq-icon');
            if (this.open) {
                icon.textContent = '-'; // Change to minus when open
            } else {
                icon.textContent = '+'; // Change back to plus when closed
            }
        });
    });
}

// Cart array to store products (retrieve from localStorage if it exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart in localStorage and cart icon
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIndicator(); // Update the cart indicator globally
}

// Function to update the cart indicator
function updateCartIndicator() {
    const cartBadge = document.querySelector('.cart-badge');
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems; // Display the total number of items
            cartBadge.style.display = 'flex'; // Show the badge if there are items
        } else {
            cartBadge.style.display = 'none'; // Hide the badge if the cart is empty
        }
    }
}

// Update the opacity of the decrease button based on the quantity
function updateDecreaseButtonOpacity() {
    const decreaseButton = document.querySelector('.decrease');
    const quantityElement = document.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent);

    // Set opacity based on quantity
    if (quantity === 1) {
        decreaseButton.style.opacity = '0.5'; // Reduced opacity if quantity is 1
    } else {
        decreaseButton.style.opacity = '1'; // Full opacity if quantity is more than 1
    }
}

// Event listeners for increase and decrease buttons (only if these elements exist)
if (document.querySelector('.increase') && document.querySelector('.decrease')) {
    document.querySelector('.increase').addEventListener('click', () => {
        let quantityElement = document.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        updateDecreaseButtonOpacity(); // Update opacity after increase
    });

    document.querySelector('.decrease').addEventListener('click', () => {
        let quantityElement = document.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            updateDecreaseButtonOpacity(); // Update opacity after decrease
        }
    });
    // Initialize the decrease button opacity based on the initial quantity
    updateDecreaseButtonOpacity(); // Set opacity on page load
}

// Add product to cart from main product section (only if the product page exists)
if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', () => {
        let productName = document.querySelector('h1').textContent;
        let price = document.querySelector('.item-price h2').textContent;
        let quantity = parseInt(document.querySelector('.quantity').textContent);

        addItemToCart(productName, price, quantity);
        alert(`${quantity} ${productName}(s) added to cart!`);
    });
}

// Add product to cart from "You may also like" section (only if the section exists)
if (document.querySelectorAll('.suggested-products .add')) {
    document.querySelectorAll('.suggested-products .add').forEach(button => {
        button.addEventListener('click', (event) => {
            let productCard = event.target.closest('.suggested-product-card');
            let productName = productCard.querySelector('.name').textContent;
            let price = productCard.querySelector('.price').textContent;

            addItemToCart(productName, price, 1);
            alert(`1 ${productName} added to cart!`);
        });
    });
}

// Function to add item to cart
function addItemToCart(productName, price, quantity) {
    // Check if the product already exists in the cart
    let existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Update quantity
    } else {
        cart.push({ name: productName, price, quantity }); // Add new product
    }

    // Save updated cart to localStorage and update cart indicator
    updateCart();
}

// Run page-specific initialization functions on page load
window.onload = () => {
    // Initialize page-specific features
    if (document.querySelector('.carousel')) {
        initializeCarousel(); // Only on Home page where the carousel exists
    }

    if (document.getElementById("shopForText")) {
        initializeTextChange(); // Only on pages with the text change feature
    }

    if (document.getElementById("search-bar")) {
        initializeSearch(); // Only on pages with the search bar
    }
    if (document.querySelector('.faq-right')) {
        initializeFAQToggle(); // Only on pages with FAQ section
    }

    updateCartIndicator(); // Update the cart indicator when the page loads
};



