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
        this.popup.querySelector('.close-x').addEventListener('click', () => this.closePopup());
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


// search class to provide search bar with product suggestions
class Search {
    constructor() {
        // list of products
        this.products = [
            { name: "Cakes - Caramel Butter Cream Cake",  url: "html/caramel-butter-cream-cake.html" },
            { name: "Cakes - Strawberry Fresh Cream Cake", url: "html/strawberry-fresh-cream-cake.html" },
            { name: "Cakes - Tiramisu Mille Crepe Cake", url: "#" },
            { name: "Cakes - Gateau Chocolate Bar Cake", url: "#" },
            { name: "Cakes - White Peach Cake", url: "#" },
            { name: "Cakes - White Zebra Mille Crepe Cake", url: "#"},
            { name: "Ice Cream - Dessert Monaka Salted Caramel", url: "#" },
            { name: "Ice Cream - Warabi Mochi and Kinako Ice Bar", url: "#" },
            { name: "Ice Cream - Dessert Monaka Setouchi Lemon Tart", url: "#" },
            { name: "Ice Cream - Monaka Opera", url: "html/monaka-opera.html" },
            { name: "Ice Cream - Amaou Strawberry Soft Serve", url: "#" },
            { name: "Ice Cream - Monaka Gateau Fraise", url: "html/monaka-gateau-fraise.html" },
            { name: "Chilled Items - Strawberry Milk Pudding", url: "#" },
            { name: "Chilled Items - White Peach Jelly Cup", url: "#" },
            { name: "Chilled Items - Warabi Mochi Uji Matcha", url: "#" },
            { name: "Chilled Items - Fluffy Cream Roll Uji Matcha", url: "#" },
            { name: "Chilled Items - Chocolate Cream Puff", url: "#" },
            { name: "Chilled Items - Yamanashi Pione Jelly Glass", url: "#" },
            { name: "Baked Goods - Gateau au Fromage", url: "#" },
            { name: "Baked Goods - Chocolate Flavored Longevity Ring Gift Box (4pcs)", url: "#" },
            { name: "Baked Goods - Brownie Box (6pcs)", url: "#" },
            { name: "Baked Goods - Chocolate Ganache Pie", url: "#" },
            { name: "Baked Goods - Hokkaido Red Bean Mochi Pie", url: "#" },
            { name: "Baked Goods - Italian Chestnut Cake", url: "#" }
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
            product.name.toLowerCase().includes(query)
        );
        // if no products match query, call method to show message
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
            // create link for suggestion
            const suggestionLink = document.createElement("a");
            suggestionLink.textContent = product.name;
            // prevent default navigation 
            suggestionLink.href = "#";
            suggestionLink.classList.add("suggestion-link");
            // redirect to product's html page onclick
            suggestionLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.selectSuggestion(product.url);
            })
            // append suggestion item to suggestions list
            suggestionItem.appendChild(suggestionLink);
            this.suggestionsList.appendChild(suggestionItem);
        });
    }
    //method to handle selection  of suggestion andnavigate to product page
    selectSuggestion(productUrl) {
        window.location.href = productUrl;
    }
    // method to show "no results" message if no matches found
    showNoResults() {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No results found";
        this.suggestionsList.appendChild(noResultsItem);
    }
}


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


// Cart class to handle adding items, updating cart, calculating totals
class Cart {
    constructor() {
        this.cart = this.loadCartFromLocalStorage();
        // ensure cart indicator is updated when the class is initialised
        this.updateCartIndicator();
    }
    get length() {
        return this.cart.length;
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
                    <button class="remove-control" data-product="${item.productName}">x</button>
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
            // update event listeners for removing item
            this.updateRemoveButtonListeners();
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
    // method to update listeners for remove button
    updateRemoveButtonListeners() {
        document.querySelectorAll('.remove-control').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                this.removeItem(productName);
            });
        });
    }
    //method to to remove an item
    removeItem(productName) {
        this.cart = this.cart.filter(item => item.productName !== productName);
        this.updateCart();
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


// CartHandler class to handle product details
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
    // method to get product details of item when add to cart button is clicked
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
    // method to get product details of item when add button on suggested items section is clicked (You May Also Like section)
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


// QuantityHandler class to handle increasing and decreasing quantity of products
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
        // initialise decrease button opacity based on initial quantity
        this.updateDecreaseButtonDisabled();
    }
    // change quantity by specified amount
    changeQuantity(amount) {
        // get current quantity
        let quantity = parseInt(this.quantityElement.textContent);
        quantity += amount;
        // prevent decrease below 1
        if (quantity >= 1) {
            // update displayed qantity
            this.quantityElement.textContent = quantity;
            // adjust button opacity if needed
            this.updateDecreaseButtonDisabled();
        }
    }
    // adjust opacity and disable state of the decrease button based on the quantity
    updateDecreaseButtonDisabled() {
        const quantity = parseInt(this.quantityElement.textContent);
        if (quantity <= 0) {
            // disable button if quantity is 0
            this.decreaseButton.disabled = true;
        } else {
            // enable the button if quantity is valid
            this.decreaseButton.disabled = false;
        }
    }
}


// PromoCodeManager class to handle promo code input
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
    // method to handle promo code application logic
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


// CheckoutManager class to handle validation before payment can be made, clearing cart and updating costs when checkout is completed
class CheckoutManager {
    constructor(cart) {
        this.cart = cart;
        // select the form
        this.form = document.querySelector('form');
        // check if the form exists on page
        if (this.form) {
            // select input fields for user details
            this.initialize();
        }
    }
    // initialise checkout process
    initialize() {
        // attach event listener for Pay Online button if it's present
        this.form.addEventListener('submit', (event) => {
            if (!this.cartNotEmpty()) {
                event.preventDefault();
                alert("Your cart is empty. Please add items to the cart before proceeding.");
                return;
            }
             // handle checkout process by validating input fields
            if(!this.validateFields()){
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this.completeCheckout();
        });
    }
    // check if cart is empty
    cartNotEmpty(){
        console.log("Cart state in cartNotEmpty:", this.cart.length)
        return this.cart.length > 0;
    }
    // validate input fields
    validateFields() {
        const requiredFields = Array.from(this.form.querySelectorAll('input[required]'));
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false; // return false if any field is empty
            }
        }
        return true; // all fields are valid
    }
    // complete checkout, clear cart, reset costs
    completeCheckout() {
        // clear cart when checkout completed
        this.cart.clearCart();
        // reset costs
        this.updateCosts(0);
        alert("Checkout completed successfully! Thank you for your purchase.");
        // reload page to reset state
        location.reload();
    }
    // clear cart (debug)
    clearCart() {
        console.log('Cart cleared!');
    }
    // update costs (debug)
    updateCosts(newAmount) {
        console.log('Costs updated to:', newAmount);
    }
}


// CountryCodeSelector class to handle dropdown of country codes in checkout
class CountryCodeSelector {
    constructor(selectElementId, countryCodes) {
        this.selectElement = document.getElementById(selectElementId);
        this.countryCodes = countryCodes;
    }
    // method to populate the select element with country codes
    populateCountryCodes() {
        // check if element exists
        if (!this.selectElement){
            return;
        }
        // clear existing options
        this.selectElement.innerHTML = "";
        // add the new options
        this.countryCodes.forEach(({ code, country }) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${code} (${country})`;
            this.selectElement.appendChild(option);
        });
    }
}


// PickupLocationManager class to handle dropdown of locations in checkout
class PickupLocationManager {
    constructor(selectElementId, locations) {
        this.selectElement = document.getElementById(selectElementId);
        this.locations = locations;
    }
    populateLocations() {
        // check if element exists
        if  (!this.selectElement) {
            return;
        }
        this.locations.forEach(location => {
            const option = document.createElement("option");
            option.textContent = location;
            this.selectElement.appendChild(option);
        });
    }
    clearLocations() {
        // check if element exists
        if (!this.selectElement) {
            return;
        }
        // clears all existing options
        this.selectElement.innerHTML = "";
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // initialise animations
    const animationHandler = new AnimationHandler();
    animationHandler.initializeAnimations();

    //instantiate sidebar
    const sidebar = new Sidebar();
    // select button that opens sidebar
    const openSidebarButton = document.getElementById("openSidebarButton");
    if (openSidebarButton) {
        // Call open method to display sidebar
        openSidebarButton.addEventListener("click", () => {
            sidebar.open();
        });
    }
    // select button that closes sidebar
    const closeSidebarButton = document.getElementById("closeSidebarButton");
    if (closeSidebarButton) {
        // Call close method to hide sidebar
        closeSidebarButton.addEventListener("click", () => {
            sidebar.close();
        });
    }

    // instantiating  popup
    new SubscriptionPopupManager();
    // instantiate and initialise carousel
    const carousel = new Carousel('.carousel', '.carousel-slide', '.dot');
    if (carousel.carouselContainer) {
        carousel.initialize();
    }

    // initialise textChanger
    const textChanger = new TextChanger();
    textChanger.initialize();

    // initialise search
    const search = new Search();
    search.initialize();

    // initialise faq toggle
    const faqToggle = new FAQToggle();
    faqToggle.initialize();

    // instantiate Cart and update checkout summary
    const cart = new Cart();
    cart.updateCheckoutSummary();

    // initialise cartHandler
    const cartHandler = new CartHandler();
    cartHandler.initialize();

    //initialise quantityHandler
    const quantityHandler = new QuantityHandler();
    quantityHandler.initialize();

    // instantiating promoCodeManager
    new PromoCodeManager();

    // pass the cart instance to CheckoutManager
    new CheckoutManager(cart);

    // define pickup locations
    const pickupLocations = [
        "Chateraise @ Westgate",
        "Chateraise @ Lot 1",
        "Chateraise @ Clementi Mall",
        "Chateraise @ AMK Hub",
        "Chateraise @ Oasis Terraces",
        "Chateraise @ Chinatown Point",
    ];
    // instantiating pickupManager
    const pickupManager = new PickupLocationManager("pickup-location", pickupLocations);
    pickupManager.populateLocations();

    // define country codes
    const countryCodes = [
        { code: "+65", country: "SG" },
        { code: "+1", country: "US" },
        { code: "+44", country: "UK" },
        { code: "+91", country: "IN" },
        { code: "+61", country: "AU" },
        { code: "+81", country: "JP" },
    ];
    // instantiating populateCountryCodes
    const countryCodeSelector = new CountryCodeSelector("country-code", countryCodes);
    countryCodeSelector.populateCountryCodes();
});