# Chateraise Singapore Redesign Website

This project is a redesigned eCommerce platform for Chateraise Singapore, aimed at enhancing navigation, improving user engagement, and provide a seamless shopping experience. The website allows users to easily browse products, access detailed information, and complete purchases efficiently. The new design integrates a cohesive layout with an inviting colour scheme that aligns with the brand, and interactive features to capture users’ attention and encourage them to explore the website, creating an engaging experience that can attract more customers to the brand.

While the current website fulfils basic requirements, it lacks the visual appeal and functionality that shoppers would expect. This redesign addresses these issues by improving the overall aesthetic and usability, making the site more intuitive and enjoyable to navigate. The goal is to create a shopping experience that not only meets customer needs but also builds brand loyalty and inspires more purchases.

## Design Process
 
The design process focused on creating a user-friendly and efficient eCommerce website for Chateraise Singapore, catering to customers who want a smooth and enjoyable online shopping experience. The main goals were to improve the site’s visual appeal, simplify navigation, and ensure seamless transition from browsing to checkout. By addressing these areas, the redesign offers a more intuitive and accessible experience, helping users easily explore products and complete their purchases with ease.

User Stories:
- As a customer, I want to be able to easily navigate to different product categories so that I can browse through the items I am interested in quickly.
- As a customer, I want to search for products quickly at the homepage, so that I can find what I need without browsing through the entire site.
- As a customer, I want the website to have dynamic elements and movement, so that it feels more engaging and less static.
- As a customer, I want to view product reviews, so that I can make better informed decisions when deciding on a purchase.
- As a customer, I want to easily access a FAQ section, so that I can find answers to common questions without needing to contact support.
- As a customer, I want to easily return to previous pages and categories from the product details page so I can keep exploring other options without getting lost
- As a customer, I want to see a suggested items section, so that I can discover related products that I might be interested in.
- As a customer, I want to easily remove items directly from my cart with a single click, so that I can quickly adjust my order.
- As a customer, I want to have a dropdown option to select my country code and pickup location, so that I can quickly fill in my contact information and speed up the checkout process.


[Figma Wireframe Link](https://www.figma.com/design/sEO7FBOBMubuo1wOFewrPg/FED_S10268407E_Serene_Assg1_wireframe?node-id=0-1&t=p5PAQC2OpNhISN59-1) 

## Features
### Existing Features
**1. Search Functionality on Homepage** - Allows users to quickly find products by entering keywords, saving time and effort.

**2. Sidebar Navigation** - Provides users with quick access to product categories and other important pages through a collapsible sidebar, making navigation more efficient and user-friendly.

**3. Newsletter Subscription on Footer** - – Allows users to subscribe to updates by entering their email, providing confirmation via a popup.

**4. Advert Carousel** - Displays rotating advertisements or promotions, allowing users to easily discover ongoing offers and new products.

**5. Cart Icon Indicator** - Allows users to see the number of items in their cart on the cart icon in the navigation bar, providing easy access to their cart’s status without needing to open the checkout page.

**6. FAQ Section** - Allows user to expand and view answers to common questions about purchasing and delivery, improving the shopping experience by providing helpful information immediately.

**7. Breadcrumb Navigation** - Provides a simple way for users to trace their steps and navigate back to previous pages or categories, ensuring smooth navigation through the site.

**8. Promo code Validation** - Allows users to input promo codes, validate them only if they are 8 characters long, providing clear feedback when applied successfully.

**9. Empty Cart Validation** - Prevents users from proceeding to checkout without items in the cart, displaying an alert if the cart is empty.

**10. Remove Items from Cart** - Provides users with the ability to update their cart quickly by removing items directly with a single click, making the checkout process smoother.

### Features Left to Implement
**1. User Login System** - Allows users to create accounts and log in, providing personalised shopping experiences and order tracking.

**2. Ratings and Reviews** - Enables users to leave rating and reviews for products, helping other shoppers make more informed purchasing decisions on specific products.

**3. Order History** - Allows logged-in users to view past orders and re-purchase items quickly, improving user convenience and engagement.

## Technologies Used
**1. [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**
   - This project uses HTML as the markup language.

**2. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**
   - This project uses CSS for styling and formatting.

**3. [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
   - This project uses JS to enhance the features of the website.

## Testing
**1. Newsletter Subscription Popup**
1. Go to the footer section of any page
2. Try to submit the form with an invalid email address and verify that a relevant error message appears
3. Try to submit the form with a valid email address and verify that a popup appears indicating successful subscription.
4. After closing the popup, verify that the page can be scrolled again

**2. Sidebar Navigation**
1. Open the sidebar by clicking on the ‘Menu’ button in the navigation bar
2. Test the functionality of sidebar links and verify that they redirect to the correct pages
3. Verify that the sidebar closes properly when clicking the close icon or when navigating to a new page
4. Ensure the sidebar remains functional and accessible on all screen sizes

**3. Search Function**
1. Go to the “Home” page 
2. Enter various keywords into the search bar and verify that the results are accurate and relevant
3. Check for cases where no results are found and ensure an appropriate message is displayed
4. Verify that clicking on the result would redirect to the correct pages (links to “caramel butter cream cake”, “strawberry fresh cream cake”, “monaka opera”, “monaka gateau fraise” should work)

**4. Quantity Selector**
1. Go to any of the product details page
2. Try adjusting the quantity below 1 and verify that the quantity selector prevents this action
3. Ensure correct number of items is added to the cart when quantity is changed

**5. Promo Code Validation**
1. Go to the “checkout” page
2. Enter any value that is less than 8 characters and verify that an alert message appears, showing that promo code is invalid
3. Verify that a success alert appears when a valid promo code is applied (anything that is 8 characters long)

**6. Empty Cart Validation**
1. Go to the “checkout” page with an empty cart
2. Press the “pay online” button and verify that an alert message appears, indicating that the cart is empty and cannot proceed with checkout
3. Try adding an item into the cart and fill in required fields in form
4. Verify that clicking on the “pay-online” button would indicate that checkout process is successful, and cart and form input are cleared

**7. Form Validation**
1. Go to the “Checkout” page
2. Leave required fields blank and try to proceed with the checkout process to verify that checkout process will not proceed
3. Submit the form with all valid details and with items in cart and ensure that the checkout process completes successfully

**Responsive Design**
1. Verify that contents in each section does not spill when screen size changes
2. Verify that font size and image size changes accordingly to screen size changes

## Credits

### Content
- [Chatgpt](https://chatgpt.com/)

### Media
- The photos used in this site were obtained from:
    - https://www.instagram.com/chateraise.singapore/?hl=en
    - [delivery image](https://wearesolomon.com/wp-content/uploads/2019/03/If-your-food-delivery-man-handed-you-the-real-menu-of-their-everyday-lives-the-story-of-Mohammed-1-1.jpg)
    - [chateraise logo](https://play-lh.googleusercontent.com/A0lglNlcPRoq_WY6z1BKt2-t4yfQo9YMbEjRXaiT2_6-Fl-jq1SD_FlxGH_AJF4x7p_X)
    - [aboout us image](https://sethlui.com/wp-content/uploads/2017/05/chateraise-singapore-tpy-19-800x533.jpg)

### Acknowledgements
Inspired by:
- [Fender Play](https://www.fender.com/play)
- [Milk Bar Store](https://milkbarstore.com/)