import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCart: false,
  foods: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showCart(state, action) {
      state.isShowCart = action.payload;
    },
    addToCart(state, action) {
      const { food: payloadFood } = action.payload;

      const foodIndex = state.foods.findIndex(
        (food) => food.food.id === payloadFood.id
      );

      if (foodIndex === -1) {
        state.foods.push({ ...action.payload, quantity: 1 });
      } else {
        state.foods[foodIndex].quantity++;
      }
    },
    removeFromCart(state, action) {
      const updatedFoods = state.foods.filter(
        (food) => food.id !== action.payload.id
      );
      state.foods = updatedFoods;
    },
    clearCart(state) {
      state.foods = [];
    },
    initExistingCart(state, action) {
      state.foods = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export const selectIsShowCart = (state) => state.cart.isShowCart;
export const selectFoodsFromCart = (state) => state.cart.foods;

export default cartSlice.reducer;
