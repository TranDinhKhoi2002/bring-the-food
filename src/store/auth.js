import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    img: "",
  },
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfo(state, action) {
      state.user = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectUserError = (state) => state.auth.error;

export default authSlice.reducer;
