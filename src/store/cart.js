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
      const { food: payloadFood, amount: payloadAmount } = action.payload;

      const foodIndex = state.foods.findIndex(
        (food) => food.id === payloadFood.id
      );

      if (foodIndex === -1) {
        const food = { ...action.payload, amount: payloadAmount };
        state.foods.push(food);
      } else {
        state.foods[foodIndex].amount += payloadAmount;
      }

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state.foods));
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
