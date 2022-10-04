import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food";
import authReducer from "./auth";
import cartReducer from "./cart";
import detailTabReducer from "./detailTab";
import rootSaga from "../saga/rootSaga";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  food: foodReducer,
  auth: authReducer,
  cart: cartReducer,
  comment: detailTabReducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload,
    };

    return nextState;
  }

  return rootReducer(state, action);
};

export const makeStore = () => {
  const store = configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore);
