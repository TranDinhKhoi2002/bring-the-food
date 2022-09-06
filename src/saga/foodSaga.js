import { takeLatest, call, put, debounce } from "redux-saga/effects";
import { foodActions } from "../store/food";
import foodApi from "../api/foodApi";

function* fetchFoodList(action) {
  try {
    const listFood = yield call(
      foodApi.getFoods,
      "/best-foods",
      action.payload
    );
    yield put(foodActions.fetchFoodsSuccess(listFood));
  } catch (error) {
    yield put(foodActions.fetchFoodsFailed(error));
  }
}

function* handleSearchDebounce(action) {
  yield put(foodActions.setFilter(action.payload));
}

export default function* foodSaga() {
  yield takeLatest(foodActions.fetchFoodList.type, fetchFoodList);
  yield debounce(500, foodActions.setFilterWidthDebounce, handleSearchDebounce);
}
