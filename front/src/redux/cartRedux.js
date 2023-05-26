import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      // state.quantity = 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      // state.total = 0;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      // state.quantity = 0;
      const newProducts = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      state.products = newProducts;
      state.total -= action.payload.price * action.payload.quantity;
      // state.total = 0;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
