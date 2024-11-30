// Sets up event listeners for various UI elements
export const setupEventListeners = (elements, eventsHandlers) => {
  elements.shoppingListIcon.addEventListener("click", () => eventsHandlers.handleShoppingListSwitching(true));
  elements.closeButton.addEventListener("click", () => eventsHandlers.handleShoppingListSwitching(false));
  elements.roomsList.addEventListener("click", (event) => eventsHandlers.handleBookingClick(event));
  elements.servicesList.addEventListener("click", (event) => eventsHandlers.handleBookingClick(event));
  elements.shoppingListContainer.addEventListener("click", (event) => eventsHandlers.handleBookingClick(event));
  elements.alertCloseButton.addEventListener("click", () => eventsHandlers.handleCloseAlert());
  elements.checkOutButton.addEventListener("click", () => eventsHandlers.openBuyerInfoForm());
  elements.submitFormButtom.addEventListener("click", () => eventsHandlers.validateAndShowReceipt());
};
