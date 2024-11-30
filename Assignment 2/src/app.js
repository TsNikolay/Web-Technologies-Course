import { dummyData } from "./data/data.js";
import { setupEventListeners } from "./modules/events.js";
import {
  createProductElement,
  createShoppingListItem,
  renderShoppingList,
  toggleShoppingList,
  updateCartVisibility,
  updateTotalPrice,
  generateReceipt,
  openBuyerInfoForm,
  showAlert,
  closeAlert,
} from "./modules/ui.js";
import { bookItem, removeItem, countTotalPrice, isThereDiscount } from "./modules/shoppingList.js";
import { setupFormValidation, extractNameFromForm } from "./modules/formValidation.js";

// Cache DOM elements for frequent use
const elements = {
  shoppingListIcon: document.querySelector(".shopping-list-icon-container"),
  closeButton: document.querySelector(".closeButton"),
  roomsList: document.getElementById("roomsListRow"),
  servicesList: document.getElementById("servicesListRow"),
  shoppingListContainer: document.querySelector(".shopping-list-container"),
  counter: document.querySelector(".shopping-list-counter"),
  roomsListElements: document.querySelector(".list-rooms-section"),
  alertCloseButton: document.querySelector(".btn-close"),
  checkOutButton: document.querySelector(".checkOutButton"),
  servicesListElements: document.querySelector(".list-services-section"),
  submitFormButtom: document.getElementById("submitFormButton"),
};

// Application state management
let state = {
  shoppingList: {
    rooms: [],
    services: [],
  },
  totalPrice: 0,
  isDiscount: false,
};

// Event handlers for user actions
const eventsHandlers = {
  // Handles adding and removing items from the shopping list
  handleBookingClick: (event) => {
    const clickedElement = event.target;
    const type = clickedElement.closest("[data-type]")?.dataset.type; // Determine if the item is a room or service
    const id = clickedElement.closest("[data-id]")?.dataset.id;

    if (!type || !id) return; // Exit if type or ID is not found

    const category = type === "room" ? "rooms" : "services";
    const list = state.shoppingList[category];

    // Handle adding an item to the shopping list
    if (clickedElement.classList.contains("book-button") || clickedElement.classList.contains("plus")) {
      const item = dummyData[category].find((item) => item.id == id);
      bookItem(item, type, list, elements.counter);
    }
    // Handle removing an item from the shopping list
    else if (clickedElement.classList.contains("minus")) {
      const item = list.find((item) => item.id == id);
      removeItem(item, list, elements.counter);
    }

    // Update the shopping list UI and state
    renderShoppingList(state.shoppingList, elements.roomsListElements, elements.servicesListElements, createShoppingListItem);
    updateCartVisibility();
    state.totalPrice = countTotalPrice(state.shoppingList);
    state.isDiscount = isThereDiscount(state.shoppingList);
    updateTotalPrice(state.totalPrice, state.shoppingList, state.isDiscount);
  },

  // Toggles the visibility of the shopping list
  handleShoppingListSwitching: (isVisible) => {
    toggleShoppingList(isVisible);
  },

  // Opens the Buyer Information form or shows an alert if no rooms are selected
  openBuyerInfoForm: () => {
    if (state.shoppingList.rooms.length > 0) {
      openBuyerInfoForm();
    } else {
      showAlert();
    }
  },

  // Closes any active alert
  handleCloseAlert: () => {
    closeAlert();
  },

  // Validates form input and generates a receipt upon successful validation
  validateAndShowReceipt: () => {
    if (setupFormValidation()) {
      const name = extractNameFromForm();
      state.totalPrice = countTotalPrice(state.shoppingList);
      state.isDiscount = isThereDiscount(state.shoppingList);
      generateReceipt(name, state.shoppingList, state.totalPrice, state.isDiscount);
    }
    resetAppState();
  },
};

//Resets the application to the initial state
const resetAppState = () => {
  state = {
    shoppingList: {
      rooms: [],
      services: [],
    },
    totalPrice: 0,
    isDiscount: false,
  };

  elements.counter.textContent = 0;
  toggleShoppingList(false);
  renderShoppingList(state.shoppingList, elements.roomsListElements, elements.servicesListElements, createShoppingListItem);
  updateCartVisibility();
  updateTotalPrice(0, false);
};

// Initializes the application by populating the catalog and setting up event listeners
const initApp = () => {
  dummyData.rooms.forEach((item) => {
    elements.roomsList.appendChild(createProductElement(item, "room"));
  });
  dummyData.services.forEach((item) => {
    elements.servicesList.appendChild(createProductElement(item, "service"));
  });

  setupEventListeners(elements, eventsHandlers);
};

initApp();
