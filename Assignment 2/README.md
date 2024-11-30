# Hotel Booking Application

## Overview

The Hotel Booking Application is a web-based platform that allows users to:

- Browse through available rooms and hotel services.
- Add selected rooms and services to a shopping list.
- Enter personal details and validate them during checkout.
- View a dynamically generated receipt upon completing the reservation.

The application uses **Bootstrap 5** for a modern and responsive user interface and employs modular JavaScript for scalability and maintainability.

---

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6 Modules)**
- **Bootstrap 5.3** (for UI components and responsiveness)

---

## Features

### Navbar

- **Bootstrap Component Used**: `navbar`.
- Custom design with the `.custom-navbar` class.
- Dynamically adjusts height on smaller screens using `adjustNavbarHeight.js`.

### Rooms and Services Catalog

- **Bootstrap Component Used**: `card`.
- Displays rooms and services in a responsive grid layout using `row`, `col`, and `gy-5` classes.
- Each card includes:
  - Room/Service name.
  - Price.
  - Description.
  - "Book now" button.

### Shopping List

- A dynamic sidebar for managing selected rooms and services.
- **Bootstrap Classes Used**:
  - `list-group`, `badge`, `btn`, and `d-none` for visibility toggling.
- Features:
  - Displays item quantities and updates prices in real-time.
  - Highlights total price, applying discounts for eligible bookings.

### Alerts

- **Bootstrap Component Used**: `alert`.
- Provides feedback to the user when attempting actions like checking out without selecting any rooms or services.
- Includes `alert-dismissible` and `btn-close` classes for closing functionality.

### Buyer Information Modal

- **Bootstrap Component Used**: `modal`.
- Captures user information during checkout.
- Implements Bootstrap's **form validation** classes (`needs-validation`, `is-valid`, `is-invalid`) and custom validation with RegEx patterns.

### Receipt Modal

- **Bootstrap Component Used**: `modal`.
- Dynamically generates a receipt with details of selected rooms and services.
- Uses the `table` and `table-striped` Bootstrap classes for clean formatting.

---

## Code Structure and JavaScript Functionality

### Key JavaScript Files

#### `app.js`

- **Purpose**: Initializes the application and sets up event listeners.
- **Key Functions**:
  - `initApp()`: Populates the room and service catalog dynamically and sets up event listeners.
  - `resetAppState()`: Resets the app to the initial state after a purchase has been made
  - `eventsHandlers`: A collection of handlers for user interactions, including:

#### `ui.js`

- **Purpose**: Handles DOM manipulations and UI updates.
- **Key Functions**:
  - `toggleShoppingList(isVisible)`: Shows or hides the shopping list sidebar.
  - `createProductElement(item, type)`: Creates a Bootstrap card for rooms or services dynamically.
  - `renderShoppingList(shoppingList, roomsContainer, servicesContainer, createItemHTML)`: Updates the shopping list based on user actions.
  - `generateReceipt(name, shoppingList, totalPrice, isDiscount)`: Creates and displays the receipt modal.
  - (more functions in the file)

#### `shoppingList.js`

- **Purpose**: Manages the logic for the shopping list, including adding, removing, and calculating totals.
- **Key Functions**:
  - `bookItem(item, type, list, counterElement)`: Adds an item to the shopping list or increases its quantity.
  - `removeItem(item, list, counterElement)`: Removes an item from the shopping list or decreases its quantity.
  - `countTotalPrice(shoppingList)`: Calculates the total price of items in the shopping list, including discounts.
  - (more functions in the file)

#### `formValidation.js`

- **Purpose**: Handles user input validation during checkout.
- **Key Functions**:
  - `setupFormValidation()`: Ensures all required fields are filled and validates specific fields like phone number and ZIP code.
  - `extractNameFromForm()`: Retrieves the user's name from the form for generating the receipt.
  - (more functions in the file)

#### `events.js`

- **Purpose**: Centralizes all event listeners for user interactions.
- **Key Functions**:
  - `setupEventListeners(elements, eventsHandlers)`: Assigns event listeners to key elements such as buttons and the shopping list.

#### `adjustNavbarHeight.js`

- **Purpose**: Dynamically adjusts the navbar height for smaller screens.
- **Key Function**:
  - `adjustNavbarHeight()`: Sets the navbar height based on the background image's dimensions.

#### `data.js`

- **Purpose**: Provides mock data for rooms and services.
- **Key Structure**:
  - `rooms`: An array of room objects with properties like `id`, `name`, `price`, `description`, and `imagePath`.
  - `services`: An array of service objects with similar properties.

---

## Contributors

- [Tsaryk Mykola](https://github.com/TsNikolay)

---

## Resources

During the development of this project, I referred to the following resources to learn and implement certain technologies:

- [Bootstrap 5 Crash Course](https://www.youtube.com/watch?v=Jyvffr3aCp0) by Web Dev Simplified
- [JavaScript Form Validation using Regular Expressions](https://www.youtube.com/playlist?list=PL1XOgHNZBUvL1vC0cXn2RnhOvrfoVVv2_) by Learn Web Dev with Norbert
- [How To Add To Cart Shopping using HTML CSS and Javascript](https://www.youtube.com/watch?v=gXWohFYrI0M) by Lun Dev

## License

This project is licensed under the MIT License.
