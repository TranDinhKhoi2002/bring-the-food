import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food";
import authReducer from "./auth";
import cartReducer from "./cart";
import detailTabReducer from "./detailTab";
import rootSaga from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  food: foodReducer,
  auth: authReducer,
  cart: cartReducer,
  comment: detailTabReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
