import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: false,
  filter: {
    _page: 1,
    _limit: 16,
  },
  foods: [],
  id: null,
  foodById: {},
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    fetchFoodList(state, action) {
      state.loading = true;
    },

    fetchFoodsSuccess(state, action) {
      state.foods = action.payload;
      state.loading = false;
    },

    fetchFoodsFailed(state, action) {
      state.loading = false;
    },

    fetchBurgersFood(state, action) {
      state.foods = action.payload;
    },

    fetchBreadsFood(state, action) {
      state.foods = action.payload;
    },

    fetchSandwichesFood(state, action) {
      state.foods = action.payload;
    },

    fetchDrinksFood(state, action) {
      state.foods = action.payload;
    },

    fetchPizzasFood(state, action) {
      state.foods = action.payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    getIdFood(state, action) {
      state.id = action.payload;
    },

    getFoodById(state, action) {
      const newFood = action.payload;
      return {
        ...state,
        foodById: [...state.foodById, newFood],
      };
    },

    removeFoodById(state, action) {
      const idFood = action.payload;
      const newFood = state.foodById.filter((food) => food.id !== idFood);
      return {
        ...state,
        foodById: [...newFood],
      };
    },

    setFilterWidthDebounce(state, action) {},
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const foodActions = foodSlice.actions;

export const selectFoodLoading = (state) => state.food.loading;
export const selectFoods = (state) => state.food.foods;
export const selectId = (state) => state.food.id;
export const selectFoodById = (state) => state.food.foodById;
export const selectFoodFilter = (state) => state.food.filter;

export default foodSlice.reducer;
