import { useDispatch } from "react-redux";
import { foodActions } from "../src/store/food";

function Home() {
  const dispatch = useDispatch();

  return (
    <button
      style={{ marginTop: "5000px" }}
      onClick={() => dispatch(foodActions.fetchFoodList())}
    >
      Fetch food list
    </button>
  );
}

export default Home;
