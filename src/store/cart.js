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
      const foodIndex = state.foods.findIndex(
        (food) => food.food.id === action.payload
      );

      if (state.foods[foodIndex].quantity === 1) {
        const updatedCart = state.foods.filter(
          (food) => food.food.id !== action.payload
        );
        state.foods = updatedCart;
      } else {
        state.foods[foodIndex].quantity--;
      }
    },
    removeEntireFood(state, action) {
      const updatedCart = state.foods.filter(
        (food) => food.food.id !== action.payload
      );
      state.foods = updatedCart;
    },
    clearCart(state) {
      state.foods = [];
    },
    initExistingCart(state, action) {
      state.foods = action.payload;
    },
    getCartFromDb(state, action) {
      console.log(action.type);
    },
  },
});

export const cartActions = cartSlice.actions;

export const selectIsShowCart = (state) => state.cart.isShowCart;
export const selectFoodsFromCart = (state) => state.cart.foods;

export default cartSlice.reducer;
