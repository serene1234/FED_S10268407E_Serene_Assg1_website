class AnimationHandler {
    constructor() {
        this.rightSections = document.querySelectorAll(".fade-in-right-section");
        this.leftSections = document.querySelectorAll(".fade-in-left-section");
    }

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.setProperty('--delay', `${index * 0.2}s`);  // Apply delay based on index
                    entry.target.classList.add("visible");  // Trigger visibility for animation
                    observer.unobserve(entry.target);  // Stop observing after the element is visible
                }
            });
        }, {
            threshold: 0.1  // Trigger when 10% of the element is visible (can be adjusted)
        });

        this.rightSections.forEach((section) => observer.observe(section));
        this.leftSections.forEach((section) => observer.observe(section));
    }
}

// Initialize the AnimationHandler class
const animationHandler = new AnimationHandler();
document.addEventListener("DOMContentLoaded", () => {
    animationHandler.initializeAnimations();  // Initialize animations once the page is loaded
});


class Sidebar {
    constructor() {
        this.sidebarElement = document.getElementById("sidebar");
        this.mainContent = document.querySelector(".main-content");
    }

    open() {
        this.sidebarElement.classList.add("sidebar-active");
        this.mainContent.style.opacity = "0.8";
        this.mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    }

    close() {
        this.sidebarElement.classList.remove("sidebar-active");
        this.mainContent.style.opacity = "1";
        this.mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    }
}

// Instantiate Sidebar
const sidebar = new Sidebar();

// Attach event listener to the button
document.addEventListener("DOMContentLoaded", () => {
    const openSidebarButton = document.getElementById("openSidebarButton");
    if (openSidebarButton) {
        openSidebarButton.addEventListener("click", () => {
            sidebar.open(); // Open sidebar when button is clicked
        });
    }

    // Attach event listener to the close button
    const closeSidebarButton = document.getElementById("closeSidebarButton");
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener("click", () => {
            sidebar.close(); // Close sidebar when button is clicked
        });
    }
});


class Carousel {
    constructor(containerSelector, slideSelector, dotSelector) {
        this.carouselContainer = document.querySelector(containerSelector);
        if (!this.carouselContainer) return; // Return early if carousel doesn't exist

        this.slides = document.querySelectorAll(slideSelector);
        this.dots = document.querySelectorAll(dotSelector);
        this.currentIndex = 0;
    }

    changeSlide() {
        if (!this.carouselContainer) return; // Ensure carouselContainer exists before changing slide
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.carouselContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.updateDots();
    }

    updateDots() {
        if (!this.dots) return; // Ensure dots exist before updating them
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[this.currentIndex].classList.add('active');
    }

    addDotClickEvent() {
        if (!this.dots) return; // Ensure dots exist before adding event listeners
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.carouselContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                this.updateDots();
            });
        });
    }

    startAutoSlide() {
        if (!this.carouselContainer) return; // Ensure carousel exists before starting auto slide
        setInterval(() => this.changeSlide(), 5000);
    }

    initialize() {
        if (!this.carouselContainer) return; // Ensure carousel exists before initializing
        this.addDotClickEvent();
        this.startAutoSlide();
        this.updateDots();
    }
}

// Instantiate and initialize the carousel (only if the carousel container exists)
const carousel = new Carousel('.carousel', '.carousel-slide', '.dot');
if (carousel.carouselContainer) {
    carousel.initialize();
}


class TextChanger {
    constructor() {
        this.shopForText = document.getElementById("shopForText");
        this.items = ["CAKES", "ICE CREAM", "BAKED GOODS", "CHILLED ITEMS"];
        this.currentIndex = 0;

        // Check if the element exists before initializing
        if (!this.shopForText) {
            return;  // Exit early if the element is not present
        }

        // Initialize the first text immediately
        this.shopForText.textContent = this.items[this.currentIndex];
    }

    initialize() {
        // Start the interval for changing text, if shopForText exists
        if (!this.shopForText) return;

        this.textChangeInterval = setInterval(() => this.changeText(), 3000);
    }

    changeText() {
        if (!this.shopForText) return; // Check if element still exists

        // Fade out the text
        this.shopForText.style.opacity = 0;

        // Wait for the fade-out to complete before changing the text
        setTimeout(() => {
            // Update the text content and increase the index
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.shopForText.textContent = this.items[this.currentIndex];

            // Fade in the new text
            this.shopForText.style.opacity = 1;
        }, 1500);  // Ensure this matches the duration of the opacity transition
    }

    stop() {
        // Stop the text change interval if needed
        clearInterval(this.textChangeInterval);
    }
}

// Instantiate and initialize the text changer when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const textChanger = new TextChanger();
    textChanger.initialize(); // Only initialize if shopForText exists
});


class Search {
    constructor() {
        this.products = [
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
        this.input = document.getElementById("search-bar");
        this.suggestionsList = document.getElementById("suggestions-list");

        // Early return if elements don't exist
        if (!this.input || !this.suggestionsList) return;
    }

    initialize() {
        if (!this.input || !this.suggestionsList) return; // Check for element existence

        // Immediately call filterSuggestions on input
        this.input.addEventListener("input", () => this.filterSuggestions());
    }

    filterSuggestions() {
        const query = this.input.value.toLowerCase();
        this.suggestionsList.innerHTML = "";

        // If query is empty, clear suggestions and return
        if (query.length === 0) return;

        const filteredProducts = this.products.filter(product =>
            product.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            this.showNoResults();
        } else {
            this.showSuggestions(filteredProducts);
        }
    }

    showSuggestions(filteredProducts) {
        filteredProducts.forEach((product, index) => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = product;
            if (index === 0) suggestionItem.classList.add("first-suggestion");
            suggestionItem.onclick = () => this.selectSuggestion(product);
            this.suggestionsList.appendChild(suggestionItem);
        });
    }

    showNoResults() {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No results found";
        this.suggestionsList.appendChild(noResultsItem);
    }

    selectSuggestion(product) {
        this.input.value = product;
        this.suggestionsList.innerHTML = ""; // Clear the suggestions after selection
    }
}

// Initialize the search functionality when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const search = new Search();
    search.initialize();  // Initialize search when the page is ready
});


class FAQToggle {
    constructor() {
        this.faqRight = document.querySelector('.faq-right');
        // Ensure FAQ section exists
        if (!this.faqRight) return;

        // Get all FAQ items (details elements)
        this.faqItems = document.querySelectorAll('.faq-right details');
    }

    initialize() {
        if (!this.faqRight) return; // Stop if FAQ right section is not present

        this.faqItems.forEach((detail) => {
            detail.addEventListener('toggle', () => this.handleToggle(detail));
        });
    }

    handleToggle(detail) {
        const icon = detail.querySelector('.faq-icon');
        if (detail.open) {
            icon.textContent = '-'; // Change to minus when open
        } else {
            icon.textContent = '+'; // Change back to plus when closed
        }
    }
}

// Initialize FAQ toggle functionality (for Product page)
document.addEventListener("DOMContentLoaded", () => {
    const faqToggle = new FAQToggle();
    faqToggle.initialize(); // Initialize only if the FAQ section is available
});


class Cart {
    constructor() {
        this.cart = this.loadCartFromLocalStorage();
    }

    loadCartFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error("Error loading cart from localStorage", error);
            return [];
        }
    }

    addItem(productName, price, quantity, image) {
        console.log(`Adding item: ${productName}, Price: ${price}, Quantity: ${quantity}, Image: ${image}`);
        const existingItemIndex = this.cart.findIndex(item => item.productName === productName);
        if (existingItemIndex !== -1) {
            this.cart[existingItemIndex].quantity += quantity;
        } else {
            this.cart.push({ productName, price, quantity, image });
        }
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartIndicator();
        this.updateCheckoutSummary();
    }

    updateCartIndicator() {
        const cartBadge = document.querySelector('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    updateCheckoutSummary() {
        const summaryItemsList = document.querySelector('.summary-items');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const subtotalElement = document.querySelector('.subtotal');
        const totalElement = document.querySelector('.total'); // Ensure total element exists

        if (!summaryItemsList) {
            console.warn("Warning: .summary-items element not found on this page.");
            return; // Skip if there's no summary-items element
        }
    
        summaryItemsList.innerHTML = '';  // Clear any previous summary items
    
        if (this.cart.length === 0) {
            console.log("Cart is empty."); // Debug log
    
            // Show the empty cart message
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block'; // Make sure it's visible
            }
    
            // Update subtotal and total to 0
            if (subtotalElement) {
                subtotalElement.textContent = 'SGD 0.00';
            }
            if (totalElement) {
                totalElement.textContent = 'SGD 0.00';
            }
    
        } else {
            console.log("Cart has items:", this.cart); // Debug log
    
            // Hide the empty cart message
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none'; // Make sure it's hidden
            }
    
            // Add each item in the cart to the summary list
            this.cart.forEach(item => {
                const price = parseFloat(item.price); // Convert price to a number if it isn't already
    
                if (isNaN(price)) {
                    console.error(`Invalid price for item ${item.productName}: ${item.price}`);
                    return; // Skip this item if the price is invalid
                }
    
                const listItem = document.createElement('li');
                listItem.classList.add('item');
                listItem.innerHTML = `
                    <img src="${item.image}" class="cart-item-image">
                    <span class="item-name">${item.productName}</span>
                    <span class="item-price">SGD ${price.toFixed(2)}</span>
                    <div class="item-controls">
                        <button class="decrease" data-product="${item.productName}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase" data-product="${item.productName}">+</button>
                    </div>
                `;
                summaryItemsList.appendChild(listItem);
            });
            
            // Recalculate and update the subtotal and total
            const subtotal = this.calculateSubtotal();
            console.log("Calculated subtotal: ", subtotal);  // Log the calculated subtotal
            const total = subtotal;  // Total is now equal to the subtotal (no GST calculation)

            if (subtotalElement) {
                subtotalElement.textContent = `SGD ${subtotal.toFixed(2)}`;
            }

            if (totalElement) {
                totalElement.textContent = `SGD ${total.toFixed(2)}`;
            } else {
                console.warn('Warning: Total price element not found on the page.');
            }

            this.updateCartItemListeners();

        }
    }
    
    calculateSubtotal() {
        return this.cart.reduce((subtotal, item) => {
            const price = parseFloat(item.price); // Ensure price is a number
            if (isNaN(price)) {
                console.error(`Invalid price for item ${item.productName}: ${item.price}`);
                return subtotal; // Skip invalid prices
            }
            return subtotal + (price * item.quantity);
        }, 0);
    }

    updateCartItemListeners() {
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                this.changeItemQuantity(productName, 1);
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                this.changeItemQuantity(productName, -1);
            });
        });

        // Handle manual quantity change directly from the checkout page (e.g., input field)
        document.querySelectorAll('.quantity').forEach(quantityElement => {
            quantityElement.addEventListener('input', (event) => {
                const productName = event.target.closest('.item').querySelector('.increase').getAttribute('data-product');
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    this.changeItemQuantity(productName, newQuantity - this.getItemQuantity(productName));
                } else {
                    this.changeItemQuantity(productName, -this.getItemQuantity(productName));
                }
            });
        });
    }

    getItemQuantity(productName) {
        const item = this.cart.find(item => item.productName === productName);
        return item ? item.quantity : 0;
    }

    changeItemQuantity(productName, change) {
        const item = this.cart.find(item => item.productName === productName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                const index = this.cart.indexOf(item);
                if (index > -1) {
                    console.log(`Removing item: ${item.productName}`); // Debug log
                    this.cart.splice(index, 1);
                }
            }
            console.log("Cart state after modification:", this.cart); // Debug log
            this.updateCart(); // Update the cart UI
        }
    }
    
    
    clearCart() {
        localStorage.removeItem('cart');
        this.cart = [];
        this.updateCart();
    }

}

// Usage: Instantiate the Cart class when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart(); // Create a Cart instance
    cart.updateCheckoutSummary(); // Update the checkout summary
});


class CartHandler {
    constructor() {
        this.cart = new Cart(); // Assuming you have a Cart class that handles cart logic
    }

    initialize() {
        // Add to cart for the main product page (check if the element exists first)
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            this.initializeMainProductAddToCart(addToCartButton);
        }

        // Add to cart for suggested products section (check if elements exist)
        const suggestedAddButtons = document.querySelectorAll('.suggested-products .add');
        if (suggestedAddButtons.length > 0) {
            this.initializeSuggestedProductAddToCart(suggestedAddButtons);
        }
    }

    initializeMainProductAddToCart(addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            let productName = document.querySelector('.item-name h1').textContent;
            let priceElement = document.querySelector('.item-price h2'); // Price element
            let imageElement = document.querySelector('.item-image img');
            console.log(imageElement); // Check if it's found
            let imageSrc = imageElement ? imageElement.src : ''; // Safe fallback
            console.log(imageSrc); // Verify the image URL
            if (priceElement && priceElement.textContent) {
                let price = priceElement.textContent.trim();
                let cleanedPrice = this.cleanPriceString(price);
                let numericPrice = parseFloat(cleanedPrice);

                if (!isNaN(numericPrice)) {
                    let quantity = parseInt(document.querySelector('.quantity').textContent);

                    this.cart.addItem(productName, numericPrice, quantity, imageSrc);
                    this.updateCartSummary();
                    alert(`${quantity} ${productName}(s) added to cart!`);
                }
            }
        });
    }

    initializeSuggestedProductAddToCart(suggestedAddButtons) {
        suggestedAddButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                let productCard = event.target.closest('.suggested-product-card');
                let productName = productCard.querySelector('.name').textContent;
                let priceText = productCard.querySelector('.price').textContent;
                let cleanedPrice = this.cleanPriceString(priceText);
                let imageElement = productCard.querySelector('.suggested-image img'); // Get the image element
                let imageSrc = imageElement ? imageElement.src : ''; // Get the image source URL
                this.cart.addItem(productName, cleanedPrice, 1, imageSrc);
                this.updateCartSummary();
                alert(`1 ${productName} added to cart!`);
            });
        });
    }

    cleanPriceString(priceText) {
        // Clean the price string (remove currency symbols, commas, and spaces)
        return priceText.replace('SGD', '').replace('$', '').replace(/,/g, '').trim();
    }

    updateCartSummary() {
        let subtotal = this.cart.calculateSubtotal();
        this.updateCosts(subtotal);
        this.updateCartIndicator();
    }

    updateCosts(subtotal) {
        // Update the subtotal, total, or any other cost-related UI elements here
        console.log('Updating costs:', subtotal);
    }

    updateCartIndicator() {
        // Update the cart badge or cart indicator UI element
        console.log('Cart indicator updated');
    }
}

// Instantiate and initialize the CartHandler class
document.addEventListener('DOMContentLoaded', () => {
    const cartHandler = new CartHandler();
    cartHandler.initialize();  // Initialize only when the page is loaded
});


class QuantityHandler {
    constructor() {
        this.quantityElement = document.querySelector('.quantity');
        this.increaseButton = document.querySelector('.increase');
        this.decreaseButton = document.querySelector('.decrease');
    }

    initialize() {
        // Check if the required elements are present on the page
        if (!this.quantityElement || !this.increaseButton || !this.decreaseButton) {
            return;  // Exit early if any of the elements are missing
        }

        // Attach event listeners only if the elements exist
        this.increaseButton.addEventListener('click', () => this.changeQuantity(1));
        this.decreaseButton.addEventListener('click', () => this.changeQuantity(-1));

        // Initialize the decrease button opacity based on the initial quantity
        this.updateDecreaseButtonOpacity();
    }

    // Change quantity by the specified amount
    changeQuantity(amount) {
        let quantity = parseInt(this.quantityElement.textContent);
        quantity += amount;

        // Only allow decrease if quantity is greater than 1
        if (quantity >= 0) {
            this.quantityElement.textContent = quantity;
            this.updateDecreaseButtonOpacity();  // Update opacity after changing quantity
        }
    }

    // Update the opacity of the decrease button based on the quantity
    updateDecreaseButtonOpacity() {
        const quantity = parseInt(this.quantityElement.textContent);
        if (quantity <= 0) {
            this.decreaseButton.style.opacity = 0.5;  // Set opacity to 50% if quantity is 1 or less
            this.decreaseButton.disabled = true;     // Optionally disable the button
        } else {
            this.decreaseButton.style.opacity = 1;   // Set opacity to 100% if quantity is greater than 1
            this.decreaseButton.disabled = false;    // Re-enable the button if quantity is greater than 1
        }
    }
}

// Initialize only if the page contains the relevant elements
document.addEventListener("DOMContentLoaded", () => {
    const quantityHandler = new QuantityHandler();
    quantityHandler.initialize();  // Initialize only if the necessary elements are present
});

class PromoCodeManager {
    constructor() {
        this.promoInput = document.querySelector('#promo-code');
        this.applyPromoButton = document.querySelector('#apply-button');

        this.initialize();
    }

    initialize() {
        // Check if promo code input exists on the page
        if (!this.promoInput || !this.applyPromoButton) {
            console.warn('Promo code elements not found on this page.');
            return; // Skip initialization if not present
        }

        // Attach event listener for applying the promo code
        this.applyPromoButton.addEventListener('click', () => this.applyPromoCode());
    }

    applyPromoCode() {
        const promoCode = this.promoInput.value.trim();

        // Validate the promo code
        if (promoCode.length === 8) {
            alert('Promo code successfully applied!');
        } else {
            alert('Invalid promo code. Please try again.');
        }
    }
}

// Initialize Promo Code Manager on page load
document.addEventListener('DOMContentLoaded', () => {
    new PromoCodeManager();
});


class SubscriptionPopupManager {
    constructor() {
        this.subscribeButton = document.querySelector('.subscribe');
        this.emailInput = document.querySelector('.newsletter input[type="email"]');
        this.popup = document.getElementById('popup');

        this.initialize();
    }

    initialize() {
        // Check if all required elements exist
        if (!this.subscribeButton || !this.emailInput || !this.popup) {
            console.warn('Subscription popup elements not found on this page.');
            return;
        }

        // Attach event listeners
        this.subscribeButton.addEventListener('click', () => this.handleSubscription());
        this.popup.querySelector('.close-popup').addEventListener('click', () => this.closePopup());
    }

    handleSubscription() {
        // Validate email input
        if (!this.emailInput.value.trim() || !this.emailInput.validity.valid) {
            alert("Please enter a valid email address.");
            return;
        }

        // If email is valid, show the popup
        this.showPopup();
    }

    showPopup() {
        this.popup.style.display = 'flex'; // Show the popup
    }

    closePopup() {
        this.popup.style.display = 'none'; // Hide the popup

        // Clear the email input field
        if (this.emailInput) {
            this.emailInput.value = ''; // Clear the email input field
        }
    }
}

// Initialize the SubscriptionPopupManager on page load
document.addEventListener('DOMContentLoaded', () => {
    new SubscriptionPopupManager();
});


class CheckoutManager {
    constructor() {
        this.payOnlineButton = document.querySelector('.pay-online-button');
        
        // Check if the Pay Online button exists on the page
        if (this.payOnlineButton) {
            this.firstNameField = document.querySelector('input[placeholder="First Name"]');
            this.lastNameField = document.querySelector('input[placeholder="Last Name"]');
            this.emailField = document.querySelector('input[type="email"]');
            this.phoneNumberField = document.querySelector('input[type="tel"]');
            this.pickupDateTimeField = document.querySelector('input[type="datetime-local"]');

            this.initialize();
        }
    }

    initialize() {
        // Attach event listener for Pay Online button if it's present
        this.payOnlineButton.addEventListener('click', (event) => this.handleCheckout(event));
    }

    handleCheckout(event) {
        event.preventDefault(); // Prevent form submission by default

        // Validate form fields
        if (!this.firstNameField.value.trim() || !this.lastNameField.value.trim()) {
            alert("Please enter both your first and last names.");
            return;
        }

        if (!this.emailField.value.trim() || !this.emailField.validity.valid) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!this.phoneNumberField.value.trim()) {
            alert("Please enter your contact number.");
            return;
        }

        if (!this.pickupDateTimeField.value.trim()) {
            alert("Please select a valid pickup date and time.");
            return;
        }

        // If validation passes, proceed with checkout
        this.completeCheckout();
    }

    completeCheckout() {
        this.clearCart(); // Clear the cart when checkout is completed
        this.updateCosts(0); // Reset costs (optional)
        alert("Checkout completed successfully! Thank you for your purchase.");
        
        // Reload the page to reset the state
        location.reload();
    }

    clearCart() {
        // Add your cart clearing logic here
        console.log('Cart cleared!');
    }

    updateCosts(newAmount) {
        // Update costs logic (if applicable)
        console.log('Costs updated to:', newAmount);
    }
}

// Initialize the CheckoutManager when the page loads, but only if the Pay Online button exists
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutManager();
});