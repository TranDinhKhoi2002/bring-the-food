import { all } from "redux-saga/effects";
import foodSaga from "./foodSaga";

export default function* rootSaga() {
  yield all([foodSaga()]);
}
