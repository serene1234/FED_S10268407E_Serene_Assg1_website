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

// Call this function on page load to initialize the cart
function initializeCart() {
    if (cart.length > 0) {
        updateCart();  // Update cart display and costs if cart is not empty
    }

    debugCart(); // Debug the cart when the page is loaded
}

// Function to update cart in localStorage and cart icon
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIndicator(); // Update the cart indicator globally

    const subtotal = calculateSubtotal(); // Dynamically calculate subtotal
    updateCosts(subtotal); // Update the display with the new subtotal and total
    updateCheckoutSummary();

    debugCart(); // Debug the cart after updating it
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

// Function to clear cart
function clearCart() {
    localStorage.removeItem('cart'); // Remove cart from localStorage
    cart = []; // Reset the cart array
    updateCartIndicator(); // Update cart indicator UI
    updateCheckoutSummary();
}



// Function to show items in cart
function updateCheckoutSummary() {
    const summaryItemsList = document.querySelector('.summary-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    if (!summaryItemsList) {
        console.warn("Warning: .summary-items element not found on this page.");
        return; // Skip if there's no summary-items element
    }

    summaryItemsList.innerHTML = '';  // Clear any previous summary items

    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block'; // Show empty cart message
        }
    } else {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none'; // Hide empty cart message
        }

        // Add each item in the cart to the summary list
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('item');
            listItem.innerHTML = `
                <span class="item-name">${item.productName}</span>
                <span class="item-price">SGD ${item.price.toFixed(2)}</span>
                <div class="item-controls">
                    <button class="decrease" data-product="${item.productName}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" data-product="${item.productName}">+</button>
                </div>
            `;
            summaryItemsList.appendChild(listItem);
        });

        // Add event listeners for increase/decrease buttons
        updateCartItemListeners();
    }
}



function updateCartItemListeners() {
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            changeItemQuantity(productName, 1);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            changeItemQuantity(productName, -1);
        });
    });
}

// Function to change item quantity
function changeItemQuantity(productName, change) {
    const item = cart.find(item => item.productName === productName);
    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            // Remove item from cart if quantity is 0 or less
            const index = cart.indexOf(item);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }

        updateCart(); // Update the cart in localStorage and re-render the cart
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
        let productName = document.querySelector('.item-name h1').textContent;
        let priceElement = document.querySelector('.item-price h2'); // This is your h2 element

        if (priceElement && priceElement.textContent) {
            let price = priceElement.textContent.trim();  // Get the text content from the element

            // Clean the price string (remove non-numeric characters)
            let cleanedPrice = price.replace(/[^\d.-]/g, '').trim();

            // Parse the cleaned price string into a numeric value
            let numericPrice = parseFloat(cleanedPrice);

            if (!isNaN(numericPrice)) {
                let quantity = parseInt(document.querySelector('.quantity').textContent);  // Get the quantity

                addItemToCart(productName, numericPrice, quantity);

                // Update subtotal, total, and cart indicator
                let subtotal = calculateSubtotal();
                updateCosts(subtotal);
                updateCartIndicator();

                alert(`${quantity} ${productName}(s) added to cart!`);
            }
        }
    });
}

// Add product to cart from "You may also like" section (only if the section exists)
if (document.querySelectorAll('.suggested-products .add')) {
    document.querySelectorAll('.suggested-products .add').forEach(button => {
        button.addEventListener('click', (event) => {
            let productCard = event.target.closest('.suggested-product-card');
            let productName = productCard.querySelector('.name').textContent;
            let priceText = productCard.querySelector('.price').textContent;

            // Clean the price text before passing it to addItemToCart
            let cleanedPrice = priceText.replace('SGD', '').replace('$', '').replace(/,/g, '').trim();

            addItemToCart(productName, cleanedPrice, 1);
            updateCartIndicator();  // Update the cart indicator
            alert(`1 ${productName} added to cart!`);
        });
    });
}

// Function to add item to cart
function addItemToCart(productName, price, quantity) {
    // Ensure price is numeric (already handled by cleaning in the previous functions)
    let numericPrice = typeof price === 'number' ? price : parseFloat(price.replace('SGD', '').replace(/,/g, '').trim());

    const existingItemIndex = cart.findIndex(item => item.productName === productName);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ productName, price: numericPrice, quantity });
    }

    updateCart();
    debugCart();  // Debug the cart after adding an item

    // Log the updated cart
    console.log(cart);
}

// Function to calculate subtotal
function calculateSubtotal() {
    return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

// Function to update costs
function updateCosts(newSubtotal) {
    const subtotalElement = document.querySelector('.subtotal');
    const gstElement = document.querySelector('.gst');
    const totalElement = document.querySelector('.total');

    if (subtotalElement && gstElement && totalElement) {
        const subtotal = parseFloat(newSubtotal);
        const total = subtotal;  // Assuming no additional fees or taxes are added

        subtotalElement.textContent = `SGD ${subtotal.toFixed(2)}`;
        gstElement.textContent = `SGD 0.00`; // Update if necessary
        totalElement.textContent = `SGD ${total.toFixed(2)}`;
    }
}

// Function to remove item from cart
function removeItemFromCart(productName) {
    const itemIndex = cart.findIndex(item => item.productName === productName);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1); // Remove the item from the cart
    }

    // Recalculate subtotal and update UI
    let subtotal = calculateSubtotal();
    updateCosts(subtotal);
    updateCartIndicator();

    debugCart(); // Debug the cart after removing an item
}
document.querySelectorAll('.cart-item-quantity').forEach(input => {
    input.addEventListener('change', event => {
        const productName = event.target.dataset.productName; // Assume each input has a data attribute
        const newQuantity = parseInt(event.target.value);

        const item = cart.find(item => item.productName === productName);
        if (item) {
            item.quantity = newQuantity; // Update the quantity in the cart
        }

        // Recalculate and update the cart
        let subtotal = calculateSubtotal();
        updateCosts(subtotal);
        updateCartIndicator();
    });
});

// Function to log the cart contents for debugging
function debugCart() {
    console.log('Current Cart:', JSON.stringify(cart, null, 2)); // Logs the cart in a readable format
}


//Function for subsciption popup
document.querySelector('.subscribe').addEventListener('click', function() {
    // Get the email value (optional: validate it here)
    let email = document.querySelector('.newsletter input').value;

    if (email) {
        // Simulate a successful subscription (you can replace this with an actual API call)
        showPopup(); // Show the popup if subscription is successful
    }
});

// Function to show the popup
function showPopup() {
    document.getElementById('popup').style.display = 'flex'; // Show the popup
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup

    // Clear the email input field
    const emailInput = document.querySelector('.newsletter input[type="email"]');
    if (emailInput) {
        emailInput.value = '';  // Clear the email input field
    }
}

// Run page-specific initialization functions on page load
window.onload = () => {
    //Ensure popup is hidden on page load
    if (document.querySelector('.popup')){
        popup.style.display = 'none';
    }
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
    let subtotal = calculateSubtotal();
    if (subtotal > 0) {
        updateCosts(subtotal); // Only update costs if the subtotal is greater than 0
    }

    updateCartIndicator(); // Update the cart indicator when the page loads
    initializeCart();  // Run this function on page load

    // Check for the Pay Online button only when the page loads and attach the event listener
    if (document.querySelector('.pay-online-button')) {
        document.querySelector('.pay-online-button').addEventListener('click', (event) => {
            clearCart();  // Clear the cart when the Pay Online button is clicked
            updateCosts(0);
            alert("Checkout completed successfully! Thank you for your purchase.");

            // reload the page
            location.reload();
        });
    }

    // Cart empty check to show message if cart is empty on page load
    if (emptyCartMessage = document.querySelector('.empty-cart-message') && cart.length === 0) {
        emptyCartMessage.style.display = 'block'; // Show "Cart is empty" message if cart is empty
    }

};