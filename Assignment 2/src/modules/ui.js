// Toggles the visibility of the shopping list sidebar
export const toggleShoppingList = (isVisible) => {
  const shoppingListIcon = document.querySelector(".shopping-list-icon-container");
  const shoppingListContainer = document.querySelector(".shopping-list-container");

  shoppingListContainer.style.right = isVisible ? "0px" : "-400px";
  shoppingListIcon.style.display = isVisible ? "none" : "block";
};

// Creates a Bootstrap card element for rooms or services
export const createProductElement = (item, type) => {
  const col = document.createElement("div");
  col.dataset.id = item.id;
  col.dataset.type = type;
  col.classList.add("col");
  col.innerHTML = `
        <div class="card text-center h-100">
            <img src="${item.imagePath}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${item.price}$</h6>
                <p class="card-text text-start flex-grow-1">${item.description}</p>
                <button class="btn btn-primary mt-auto book-button">Book now</button>
            </div>
        </div>`;
  return col;
};

// Creates a shopping list item element
export const createShoppingListItem = (item) => {
  const newItemElement = document.createElement("div");
  newItemElement.dataset.id = item.id;
  newItemElement.dataset.type = item.type;
  newItemElement.classList.add("shopping-list");
  newItemElement.innerHTML = `
    <div class="shopping-list-item">
        <div class="shopping-list-item-image">
            <img src="${item.imagePath}" alt="">
        </div>
        <div class="shopping-list-item-name">
            ${item.name}
        </div>
        <div class="shopping-list-item-total-price">
            ${item.price}$
        </div>
        <div class="shopping-list-item-buttons"> 
            ${
              item.type === "room"
                ? `<span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>`
                : `<span class="minus">✖</span>` // Services don't have a quantity increment
            }
        </div>
    </div>`;

  return newItemElement;
};

// Renders the shopping list with rooms and services
export const renderShoppingList = (shoppingList, roomsContainer, servicesContainer, createItemHTML) => {
  roomsContainer.innerHTML = "";
  servicesContainer.innerHTML = "";
  shoppingList.rooms.forEach((item) => roomsContainer.appendChild(createItemHTML(item)));
  shoppingList.services.forEach((item) => servicesContainer.appendChild(createItemHTML(item)));
};

// Updates the visibility of the shopping list UI components
export const updateCartVisibility = () => {
  const roomsSection = document.querySelector(".list-rooms-section");
  const servicesSection = document.querySelector(".list-services-section");
  const roomsHeader = document.querySelector(".rooms-header");
  const servicesHeader = document.querySelector(".services-header");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const totalPriceContainer = document.querySelector(".total-price-container");
  const shoppingListContainer = document.querySelector(".shopping-list-container");

  const hasRooms = roomsSection.children.length > 0;
  const hasServices = servicesSection.children.length > 0;

  // Toggle visibility based on the presence of rooms or services
  roomsHeader.classList.toggle("d-none", !hasRooms);
  servicesHeader.classList.toggle("d-none", !hasServices);

  totalPriceContainer.classList.toggle("d-none", !hasRooms && !hasServices);
  emptyCartMessage.classList.toggle("d-none", hasRooms || hasServices);

  // Adjust grid layout based on the contents
  if (hasRooms || hasServices) {
    shoppingListContainer.style.gridTemplateRows = "70px 1fr 70px 70px";
  } else {
    shoppingListContainer.style.gridTemplateRows = "70px 1fr 70px";
  }
};

// Updates the total price and shows/hides the discount badge
export const updateTotalPrice = (newPrice, isDiscount) => {
  const totalPrice = document.querySelector(".total-price");
  const discountBadge = document.querySelector(".badge.text-bg-secondary");

  totalPrice.textContent = newPrice + "$";

  // Toggle discount badge visibility
  if (isDiscount) {
    discountBadge.classList.remove("d-none");
  } else {
    discountBadge.classList.add("d-none");
  }
};

// Opens the Buyer Information modal
export const openBuyerInfoForm = () => {
  const buyerInfoModal = new bootstrap.Modal(document.getElementById("buyerInfo"));
  buyerInfoModal.show();
};

// Generates receipt entries for table rows
const createReceiptEntry = (item) => {
  return `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
        </tr>
    `;
};

// Dynamically generates the receipt modal
export const generateReceipt = (name, shoppingList, totalPrice, isDiscount) => {
  const receiptContainer = document.getElementById("receiptContainer");

  receiptContainer.innerHTML = `
        <div class="modal fade" id="receipt" tabindex="-1" aria-labelledby="receiptLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="receiptLabel">Receipt</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h2>${name}, thank you for your reservation</h2>
                        
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Room</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${shoppingList.rooms.map((item) => createReceiptEntry(item)).join("")}
                            </tbody>
                        </table>
                        
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${shoppingList.services.map((item) => createReceiptEntry(item)).join("")}
                            </tbody>
                        </table>
                        <h6>No tax is charged from the client</h6>
                        <h6>${isDiscount ? "Disount was applied" : ""}</h6>
                        <h3>Total Price: $${totalPrice}</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  const receiptModal = new bootstrap.Modal(document.getElementById("receipt"));
  const buyerInfoModal = bootstrap.Modal.getInstance(document.getElementById("buyerInfo"));

  if (buyerInfoModal) {
    buyerInfoModal.hide();
  }

  receiptModal.show();
};

// Displays an alert and auto-hides it after a timeout
export const showAlert = () => {
  const alert = document.getElementById("customAlert");
  if (alert) {
    alert.classList.remove("d-none");
  }

  setTimeout(() => {
    if (alert) {
      alert.classList.add("d-none");
    }
  }, 3000);
};

// Hides the alert manually
export const closeAlert = () => {
  const alert = document.getElementById("customAlert");
  if (alert) {
    alert.classList.add("d-none");
  }
};
