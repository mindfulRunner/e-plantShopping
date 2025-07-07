import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    hasItem: (state, action) => {
      const { name } = action.payload;
      console.log(`in CartSlice, state.items: ${JSON.stringify(state.items)}`);
      if (state.items === null || state.items === undefined) {
        return true;
      }
      const foundItem = state.items.find(item => item.name === name);
      const found = foundItem != null && (typeof foundItem != "undefined");
      console.log(`in CartSlice, name: ${name}, foundItem: ${foundItem}, found: ${found}`);
      return found;
    }
  },
});

export const { addItem, removeItem, updateQuantity, hasItem } = CartSlice.actions;

export default CartSlice.reducer;
