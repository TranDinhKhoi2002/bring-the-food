import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showCart(state, action) {
      state.isShowCart = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export const selectIsShowCart = (state) => state.cart.isShowCart;

export default cartSlice.reducer;
