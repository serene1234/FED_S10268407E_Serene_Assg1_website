// animation class to manage animation in and out of elements
class AnimationHandler {
    constructor() {
        this.rightSections = document.querySelectorAll(".fade-in-right-section");
        this.leftSections = document.querySelectorAll(".fade-in-left-section");
    }
    // method to initialise animations
    initializeAnimations() {
        // detects when elements are visible in viewport
        const observer = new IntersectionObserver((entries) => {
            // loop through each element
            entries.forEach((entry, index) => {
                // check if element is visible in viewport
                if (entry.isIntersecting) {
                    // apply delay based on index of element in list
                    entry.target.style.setProperty('--delay', `${index * 0.2}s`);
                    // trigger animation by adding 'visible' class
                    entry.target.classList.add("visible");
                    // stop observing element after it is visible and animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // animation triggers when 10% of element is visible
            threshold: 0.1
        });
        this.rightSections.forEach((section) => observer.observe(section));
        this.leftSections.forEach((section) => observer.observe(section));
    }
}
// initialise AnimationHandler class
const animationHandler = new AnimationHandler();
document.addEventListener("DOMContentLoaded", () => {
    // initialise animations once the page is loaded
    animationHandler.initializeAnimations();
});


// sidebar class to manage opening and closing of sidebar
class Sidebar {
    constructor() {
        this.sidebarElement = document.getElementById("sidebar");
        this.mainContent = document.querySelector(".main-content");
    }
    // method to open sidebar
    open() {
        // add class to make sidebar visible
        this.sidebarElement.classList.add("sidebar-active");
        // dim main content area when sidebar is open
        this.mainContent.style.opacity = "0.8";
        // transition effect for smooth opening
        this.mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    }
    // method to close sidebar
    close() {
        // remove class to hide sidebar
        this.sidebarElement.classList.remove("sidebar-active");
        // restore opacity of main content area
        this.mainContent.style.opacity = "1";
        // transition effect for smooth closing
        this.mainContent.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    }
}
// instantiate Sidebar
const sidebar = new Sidebar();
// wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // select button that opens sidebar
    const openSidebarButton = document.getElementById("openSidebarButton");
    if (openSidebarButton) {
        // call open method to display sidebar
        openSidebarButton.addEventListener("click", () => {
            sidebar.open();
        });
    }
    // select button that closes sidebar
    const closeSidebarButton = document.getElementById("closeSidebarButton");
    if (closeSidebarButton) {
        // call close method to hide sidebar
        closeSidebarButton.addEventListener("click", () => {
            sidebar.close();
        });
    }
});


// SubscriptionPopupManager class to handle subscription form popup (footer)
class SubscriptionPopupManager {
    constructor() {
        this.subscribeButton = document.querySelector('.subscribe');
        this.emailInput = document.querySelector('.newsletter input[type="email"]');
        this.popup = document.getElementById('popup');

        this.initialize();
    }
    initialize() {
        // check if all required elements are present
        if (!this.subscribeButton || !this.emailInput || !this.popup) {
            return;
        }
        // Attach event listeners
        this.subscribeButton.addEventListener('click', () => this.handleSubscription());
        this.popup.querySelector('.close-popup').addEventListener('click', () => this.closePopup());
    }
    // method to handle subscription process
    handleSubscription() {
        // validate email input
        if (!this.emailInput.value.trim() || !this.emailInput.validity.valid) {
            alert("Please enter a valid email address.");
            return;
        }
        // if email valid, show popup
        this.showPopup();
    }
    // method to display popup
    showPopup() {
        this.popup.style.display = 'flex';
    }
    // method to close popup
    closePopup() {
        this.popup.style.display = 'none';
        // clear email input field after closing popup
        if (this.emailInput) {
            this.emailInput.value = '';
        }
    }
}
// initialize the SubscriptionPopupManager
document.addEventListener('DOMContentLoaded', () => {
    new SubscriptionPopupManager();
});


// carousel class to manage slides and dot navigation
class Carousel {
    constructor(containerSelector, slideSelector, dotSelector) {
        this.carouselContainer = document.querySelector(containerSelector);
        // exit if carousel container does not exist
        if (!this.carouselContainer) return;

        this.slides = document.querySelectorAll(slideSelector);
        this.dots = document.querySelectorAll(dotSelector);
        // initialise current index to track which slide is currently active
        this.currentIndex = 0;
    }
    // method to change to next slide
    changeSlide() {
        // check if carousel exists
        if (!this.carouselContainer) return;
        // update current index and loop back to first slide after last one
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        // move carousel container to current slide
        this.carouselContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        // update active dot to match current slide
        this.updateDots();
    }
    // method to update active dot based on current slide
    updateDots() {
        // check if dots exist before updating
        if (!this.dots) return;
        // remove 'active' class from all dots
        this.dots.forEach(dot => dot.classList.remove('active'));
        // add 'active' class to dot corresponding with current slide
        this.dots[this.currentIndex].classList.add('active');
    }
    // method to allow manual navigation using dots
    addDotClickEvent() {
        // check if dots exists
        if (!this.dots) return;
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // update current index when dot is clicked
                this.currentIndex = index;
                // uupdate caoursel container to show clicked slide
                this.carouselContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                // update dots corresponding with new active slide
                this.updateDots();
            });
        });
    }
    // method to start auto sliding carousel
    startAutoSlide() {
        // check if carousel exists
        if (!this.carouselContainer) return;
        // automatically change slides every 5 seconds
        setInterval(() => this.changeSlide(), 5000);
    }
    // method to initialise carousel function
    initialize() {
        // ensure carousel exists before intialising
        if (!this.carouselContainer) return;
        this.addDotClickEvent();
        this.startAutoSlide();
        this.updateDots();
    }
}
// instantiate and initialise the carousel
const carousel = new Carousel('.carousel', '.carousel-slide', '.dot');
if (carousel.carouselContainer) {
    carousel.initialize();
}

// textChanger class to cycle through text with fade effect
class TextChanger {
    constructor() {
        this.shopForText = document.getElementById("shopForText");
        // array of items to cycle through
        this.items = ["CAKES", "ICE CREAM", "BAKED GOODS", "CHILLED ITEMS"];
        this.currentIndex = 0;
        // check if the element exists before initialising
        if (!this.shopForText) {
            return;
        }
        // initialise first text
        this.shopForText.textContent = this.items[this.currentIndex];
    }
    // initialise text changing every 3 seconds
    initialize() {
        // check if shopForText exists
        if (!this.shopForText) return;
        // start interval to change text every 3 seconds
        this.textChangeInterval = setInterval(() => this.changeText(), 3000);
    }
    // method to change text with fade-out and fade-in effect
    changeText() {
        if (!this.shopForText) return;
        // fade out the text
        this.shopForText.style.opacity = 0;
        // change text after fade out and fade text back in
        setTimeout(() => {
            // update text content to next item in array
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.shopForText.textContent = this.items[this.currentIndex];
            // fade in the new text
            this.shopForText.style.opacity = 1;
        }, 1500);
    }
    // method to stop text changing interval
    stop() {
        // stop the text change interval if needed
        clearInterval(this.textChangeInterval);
    }
}
// instantiate and initialise the text changer when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const textChanger = new TextChanger();
    textChanger.initialize();
});


// search class to provide search bar with product suggestions
class Search {
    constructor() {
        // list of products
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
        // exit if elements not found
        if (!this.input || !this.suggestionsList) return;
    }
    // initialise search functionality
    initialize() {
        if (!this.input || !this.suggestionsList) return; // Check for element existence
        // call filterSuggestions on input
        this.input.addEventListener("input", () => this.filterSuggestions());
    }
    // method to filter suggestions based on user input
    filterSuggestions() {
        const query = this.input.value.toLowerCase();
        // clear previous suggestions
        this.suggestionsList.innerHTML = "";
        // if query is empty, clear suggestions and return
        if (query.length === 0) return;
        // filter products based on query
        const filteredProducts = this.products.filter(product =>
            product.toLowerCase().includes(query)
        );
        // if no products match query, call function to show message
        if (filteredProducts.length === 0) {
            this.showNoResults();
        } else {
            // show filtered suggestions
            this.showSuggestions(filteredProducts);
        }
    }
    // method to display filtered product suggestions
    showSuggestions(filteredProducts) {
        filteredProducts.forEach((product, index) => {
            // create list item for each suggestion
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = product;
            // add class to first suggestion
            if (index === 0) suggestionItem.classList.add("first-suggestion");
            suggestionItem.onclick = () => this.selectSuggestion(product);
            // append suggestion item to suggestions list
            this.suggestionsList.appendChild(suggestionItem);
        });
    }
    // method to show "no results" message if no matches found
    showNoResults() {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No results found";
        this.suggestionsList.appendChild(noResultsItem);
    }
    // method to handle selection of suggestion
    selectSuggestion(product) {
        this.input.value = product;
        // clear suggestions list after selection
        this.suggestionsList.innerHTML = "";
    }
}
// initialize the search functionality
document.addEventListener("DOMContentLoaded", () => {
    const search = new Search();
    search.initialize();
});


// FAQToggle class to manage toggling of FAQ section's icons
class FAQToggle {
    constructor() {
        this.faqRight = document.querySelector('.faq-right');
        // ensure FAQ section exists
        if (!this.faqRight) return;
        // get all FAQ items details elements
        this.faqItems = document.querySelectorAll('.faq-right details');
    }
    initialize() {
        if (!this.faqRight) return
        // add toggle event listener to each FAQ item
        this.faqItems.forEach((detail) => {
            detail.addEventListener('toggle', () => this.handleToggle(detail));
        });
    }
    // handle toggle action for each FAQ item
    handleToggle(detail) {
        const icon = detail.querySelector('.faq-icon');
        if (detail.open) {
            // change to minus when open
            icon.textContent = '-';
        } else {
            // change back to plus when closed
            icon.textContent = '+';
        }
    }
}
// initialise FAQ toggle functionality (product page)
document.addEventListener("DOMContentLoaded", () => {
    const faqToggle = new FAQToggle();
    faqToggle.initialize();
});

// Cart class to handle adding items, updating cart, calculating totals
class Cart {
    constructor() {
        this.cart = this.loadCartFromLocalStorage();
    }
    // lead cart data from localStorage, return empty array if no data found
    loadCartFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error("Error loading cart from localStorage", error);
            return [];
        }
    }
    // add item to the cart or update quantity if item already exists
    addItem(productName, price, quantity, image) {
        console.log(`Adding item: ${productName}, Price: ${price}, Quantity: ${quantity}, Image: ${image}`);
        const existingItemIndex = this.cart.findIndex(item => item.productName === productName);
        if (existingItemIndex !== -1) {
            // update quantity if item exists
            this.cart[existingItemIndex].quantity += quantity;
        } else {
            // add new item to cart
            this.cart.push({ productName, price, quantity, image });
        }
        // update cart and localStorage
        this.updateCart();
    }
    // update cart in local storage and refresh display (cart badge, checkout summary)
    updateCart() {
        // store updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));
        // update cart indicator
        this.updateCartIndicator();
        // update checkout summary
        this.updateCheckoutSummary();
    }
    // update cart badge to show total number of items in cart
    updateCartIndicator() {
        const cartBadge = document.querySelector('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            // update badge with total number of items
            cartBadge.textContent = totalItems;
            // if items exist, show badge
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    // update the checkout summary with item details and total prices
    updateCheckoutSummary() {
        const summaryItemsList = document.querySelector('.summary-items');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const subtotalElement = document.querySelector('.subtotal');
        const totalElement = document.querySelector('.total'); // Ensure total element exists
        // skip if no summary-items found
        if (!summaryItemsList) {
            return;
        }
        // clear existing summary items
        summaryItemsList.innerHTML = '';
        // if cart is empty, display message and set prices to 0
        if (this.cart.length === 0) {
            console.log("Cart is empty.");
            // show the empty cart message
            if (emptyCartMessage) {
                // show empty cart message
                emptyCartMessage.style.display = 'block';
            }
            // update subtotal and total to 0
            if (subtotalElement) {
                subtotalElement.textContent = 'SGD 0.00';
            }
            if (totalElement) {
                totalElement.textContent = 'SGD 0.00';
            }
        } else {
            // hide empty cart message
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none';
            }
            // add each item in the cart to the summary list
            this.cart.forEach(item => {
                // convert price to a number if it isn't already
                const price = parseFloat(item.price);
                if (isNaN(price)) {
                    console.error(`Invalid price for item ${item.productName}: ${item.price}`);
                    return; // skip this item if the price is invalid
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
            // recalculate and update the subtotal and total
            const subtotal = this.calculateSubtotal();
            console.log("Calculated subtotal: ", subtotal);
            const total = subtotal;  // total is equal to subtotal as there is no gst
            if (subtotalElement) {
                subtotalElement.textContent = `SGD ${subtotal.toFixed(2)}`;
            }
            if (totalElement) {
                totalElement.textContent = `SGD ${total.toFixed(2)}`;
            }
            // update event listeners for quantity change
            this.updateCartItemListeners();
        }
    }
    // method to calculate subtotal by summing up prices of all items
    calculateSubtotal() {
        return this.cart.reduce((subtotal, item) => {
            const price = parseFloat(item.price);
            if (isNaN(price)) {
                console.error(`Invalid price for item ${item.productName}: ${item.price}`);
                return subtotal;
            }
            return subtotal + (price * item.quantity);
        }, 0);
    }
    // add event listeners for changing item quantity 
    updateCartItemListeners() {
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                // increase quantity by 1
                this.changeItemQuantity(productName, 1);
            });
        });
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                // decrease quantity by 1
                this.changeItemQuantity(productName, -1);
            });
        });
        // handle manual quantity change directly from the checkout page
        document.querySelectorAll('.quantity').forEach(quantityElement => {
            quantityElement.addEventListener('input', (event) => {
                // find closest element with class 'item', find 'increase' button within the element to retrive associated name
                const productName = event.target.closest('.item').querySelector('.increase').getAttribute('data-product');
                // get new quantity entered by user
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    // calculate quantity difference and update cart
                    this.changeItemQuantity(productName, newQuantity - this.getItemQuantity(productName));
                } else {
                    // remove item from cart if new quantity is 0 or negative
                    this.changeItemQuantity(productName, -this.getItemQuantity(productName));
                }
            });
        });
    }
    // method to get current quantity of specific product in cart
    getItemQuantity(productName) {
        const item = this.cart.find(item => item.productName === productName);
        return item ? item.quantity : 0;
    }
    // method to change quantity of an item 
    changeItemQuantity(productName, change) {
        const item = this.cart.find(item => item.productName === productName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                const index = this.cart.indexOf(item);
                if (index > -1) {
                    console.log(`Removing item: ${item.productName}`); // Debug log
                    // remove item if quantity reaches 0
                    this.cart.splice(index, 1);
                }
            }
            console.log("Cart state after modification:", this.cart); // Debug log
            this.updateCart();
        }
    }
    // method to clear cart and remove from local storage
    clearCart() {
        localStorage.removeItem('cart');
        this.cart = [];
        this.updateCart();
    }
}
// instantiate the Cart class when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // create a Cart instance
    const cart = new Cart();
    // update the checkout summary
    cart.updateCheckoutSummary();
});


class CartHandler {
    constructor() {
        // instantiate Cart class to manage cart operations
        this.cart = new Cart();
    }
    initialize() {
        // add to cart for the main product page (check if the element exists first)
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            this.initializeMainProductAddToCart(addToCartButton);
        }
        // add to cart for suggested products section (check if elements exist)
        const suggestedAddButtons = document.querySelectorAll('.suggested-products .add');
        if (suggestedAddButtons.length > 0) {
            this.initializeSuggestedProductAddToCart(suggestedAddButtons);
        }
    }
    initializeMainProductAddToCart(addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            // get product details
            let productName = document.querySelector('.item-name h3').textContent; // name element
            let priceElement = document.querySelector('.item-price h4'); // price element
            let imageElement = document.querySelector('.item-image img'); // image element
            let imageSrc = imageElement ? imageElement.src : ''; // safe fallback
            // ensure price exists and retrive text content
            if (priceElement && priceElement.textContent) {
                let price = priceElement.textContent.trim();
                // clean price text
                let cleanedPrice = this.cleanPriceString(price);
                // convert price to number
                let numericPrice = parseFloat(cleanedPrice);
                // if price is valid
                if (!isNaN(numericPrice)) {
                    let quantity = parseInt(document.querySelector('.quantity').textContent);
                    // add the product to cart
                    this.cart.addItem(productName, numericPrice, quantity, imageSrc);
                    // update cart summary and alert user
                    this.updateCartSummary();
                    alert(`${quantity} ${productName}(s) added to cart!`);
                }
            }
        });
    }
    initializeSuggestedProductAddToCart(suggestedAddButtons) {
        suggestedAddButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // locate parent product card and retrivve product details
                let productCard = event.target.closest('.suggested-product-card'); // find card container
                let productName = productCard.querySelector('.name').textContent; // product name
                let priceText = productCard.querySelector('.price').textContent; // product price
                let cleanedPrice = this.cleanPriceString(priceText); // clean price text
                let imageElement = productCard.querySelector('.suggested-image img'); // image element
                let imageSrc = imageElement ? imageElement.src : ''; // image source URL
                // add suggested product to cart with quantity of 1
                this.cart.addItem(productName, cleanedPrice, 1, imageSrc);
                // update cart summary and alert user
                this.updateCartSummary();
                alert(`1 ${productName} added to cart!`);
            });
        });
    }
    // remove currency symbols, commas, and extra spaces from price string
    cleanPriceString(priceText) {
        return priceText.replace('SGD', '').replace('$', '').replace(/,/g, '').trim();
    }
    updateCartSummary() {
        // calculate cart's subtotal and update cart badge
        let subtotal = this.cart.calculateSubtotal();
        this.updateCosts(subtotal);
        this.updateCartIndicator();
    }
    updateCosts(subtotal) {
        // update the subtotal, total
        console.log('Updating costs:', subtotal);
    }
    updateCartIndicator() {
        // Update the cart badge or indicator
        console.log('Cart indicator updated');
    }
}
// instantiate and initialise the CartHandler class
document.addEventListener('DOMContentLoaded', () => {
    const cartHandler = new CartHandler();
    cartHandler.initialize();
});


class QuantityHandler {
    constructor() {
        // select quantity display and buttons for increasing and decreasing quantity
        this.quantityElement = document.querySelector('.quantity');
        this.increaseButton = document.querySelector('.increase');
        this.decreaseButton = document.querySelector('.decrease');
    }

    initialize() {
        // check if the required elements are present on the page
        if (!this.quantityElement || !this.increaseButton || !this.decreaseButton) {
            // exit early if any elements are missing
            return;
        }
        this.increaseButton.addEventListener('click', () => this.changeQuantity(1));
        this.decreaseButton.addEventListener('click', () => this.changeQuantity(-1));
        // initialize decrease button opacity based on initial quantity
        this.updateDecreaseButtonOpacity();
    }
    // change quantity by specified amount
    changeQuantity(amount) {
        // get current quantity
        let quantity = parseInt(this.quantityElement.textContent);
        quantity += amount;
        // prevent decrease below 0
        if (quantity >= 0) {
            // update displayed qantity
            this.quantityElement.textContent = quantity;
            // adjust button opacity if needed
            this.updateDecreaseButtonOpacity();
        }
    }
    // adjust opacity and disable state of the decrease button based on the quantity
    updateDecreaseButtonOpacity() {
        const quantity = parseInt(this.quantityElement.textContent);
        if (quantity <= 0) {
            this.decreaseButton.style.opacity = 0.5;
            // disable button if quantity is 0
            this.decreaseButton.disabled = true;
        } else {
            this.decreaseButton.style.opacity = 1;
            // enable the button if quantity is valid
            this.decreaseButton.disabled = false;
        }
    }
}
// initialize only if the page contains the relevant elements
document.addEventListener("DOMContentLoaded", () => {
    const quantityHandler = new QuantityHandler();
    quantityHandler.initialize();
});


class PromoCodeManager {
    constructor() {
        // select promo code input field and apply button
        this.promoInput = document.querySelector('#promo-code');
        this.applyPromoButton = document.querySelector('#apply-button');
        // initialise promo code functionality
        this.initialize();
    }
    initialize() {
        // check if promo code input exists on the page
        if (!this.promoInput || !this.applyPromoButton) {
            return;
        }
        // Add an event listener for applying the promo code
        this.applyPromoButton.addEventListener('click', () => this.applyPromoCode());
    }
    // method to hanel promo code application logic
    applyPromoCode() {
        const promoCode = this.promoInput.value.trim();
        // validate the promo code
        if (promoCode.length === 8) {
            alert('Promo code successfully applied!');
        } else {
            alert('Invalid promo code. Please try again.');
        }
    }
}
// initialise PromoCodeManager on page load
document.addEventListener('DOMContentLoaded', () => {
    new PromoCodeManager();
});


class CheckoutManager {
    constructor() {
        // select pay online button
        this.payOnlineButton = document.querySelector('.pay-online-button');
        // check if thepPay online button exists on page
        if (this.payOnlineButton) {
            // select input fields for user details
            this.firstNameField = document.querySelector('input[placeholder="First Name"]');
            this.lastNameField = document.querySelector('input[placeholder="Last Name"]');
            this.emailField = document.querySelector('input[type="email"]');
            this.phoneNumberField = document.querySelector('input[type="tel"]');
            this.pickupDateTimeField = document.querySelector('input[type="datetime-local"]');
            this.initialize();
        }
    }
    // initialise checkout process
    initialize() {
        // attach event listener for Pay Online button if it's present
        this.payOnlineButton.addEventListener('click', (event) => this.handleCheckout(event));
    }
    // handle checkout process by validating input fields
    handleCheckout(event) {
         // prevent form submission by default
        event.preventDefault();
        // validate form fields
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
        // proceed with checkout if all inputs are valid
        this.completeCheckout();
    }
    // complete checkout, clear cart, reset costs
    completeCheckout() {
        // clear cart when checkout completed
        this.clearCart();
        // reset costs
        this.updateCosts(0);
        alert("Checkout completed successfully! Thank you for your purchase.");
        // reload page to reset state
        location.reload();
    }
    // function to clear cart
    clearCart() {
        console.log('Cart cleared!');
    }
    //update costs
    updateCosts(newAmount) {
        console.log('Costs updated to:', newAmount);
    }
}
// initialise the CheckoutManager when the page loads if the pay online button exists
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutManager();
});