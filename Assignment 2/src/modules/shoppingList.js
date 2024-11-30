// Adds an item to the shopping list or increments its quantity
export const bookItem = (itemToBook, type, listToEdit, counterElement) => {
  // Check if the item already exists in the list
  const existingItem = listToEdit.find((item) => item.id === itemToBook.id);
  if (!existingItem) {
    // If the item does not exist, add it to the list with a quantity of 1
    listToEdit.push({ ...itemToBook, type: type, quantity: 1 });
    counterElement.innerText++;
  } else {
    // If the item is a service, prevent adding multiple of the same service
    if (type == "service") return;
    // Increment the quantity and adjust the total price for the room
    existingItem.quantity++;
    existingItem.price += itemToBook.price;
  }
};

// Removes an item from the shopping list or decrements its quantity
export const removeItem = (itemToRemove, listToEdit, counterElement) => {
  if (itemToRemove.quantity > 1) {
    // If the quantity is greater than 1, decrement the quantity
    itemToRemove.quantity--;
    itemToRemove.price -= itemToRemove.price / (itemToRemove.quantity + 1); // Adjust price proportionally
  } else {
    // If the quantity is 1, remove the item from the list
    const index = listToEdit.indexOf(itemToRemove);
    listToEdit.splice(index, 1);
    counterElement.innerText--;
  }
};

// Calculates the total price of items in the shopping list
export const countTotalPrice = (shoppingList) => {
  let totalSum = 0;
  for (let category in shoppingList) {
    shoppingList[category].forEach((item) => {
      totalSum += item.price;
    });
  }
  totalSum = applyDiscounts(totalSum, shoppingList);
  return totalSum;
};

// Applies discounts based on the shopping list
export const applyDiscounts = (totalPrice, shoppingList) => {
  let totalQuantityOfBookedRooms = 0;
  // Count the total quantity of booked rooms
  shoppingList.rooms.forEach((room) => {
    totalQuantityOfBookedRooms += room.quantity;
  });

  // Apply a 10% discount if 3 or more rooms are booked
  if (totalQuantityOfBookedRooms >= 3) {
    totalPrice = Math.round(totalPrice * 0.9);
  }

  return totalPrice;
};

// Checks if a discount is applicable (based on room bookings)
export const isThereDiscount = (shoppingList) => {
  const roomsBooked = shoppingList.rooms.reduce((sum, room) => sum + room.quantity, 0);
  return roomsBooked >= 3;
};
