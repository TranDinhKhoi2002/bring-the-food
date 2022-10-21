import path from "path";
import fs from "fs/promises";

import { useDispatch } from "react-redux";
import Banner from "../../components/shop/shopFoodDetail/Banner";
import DetailContainer from "../../components/shop/shopFoodDetail/DetailContainer";
import foodApi from "../../src/api/foodApi";
import { foodActions } from "../../src/store/food";
import DetailTabs from "../../components/shop/shopFoodDetail/DetailTabs";

function FoodDetailPage(props) {
  const { foodId, ingredients } = props;
  let selectedFood = props.selectedFood;

  if (!selectedFood && typeof window !== "undefined") {
    const listFood = JSON.parse(localStorage.getItem("listFood"));
    selectedFood = listFood.find((food) => food.id === foodId);
  }

  const dispatch = useDispatch();
  dispatch(foodActions.getFoodById(selectedFood));

  return (
    <div>
      <Banner />
      <DetailContainer />
      <DetailTabs ingredients={ingredients} />
    </div>
  );
}

export async function getStaticProps(context) {
  const { foodId } = context.params;
  const listFood = await foodApi.getFoods("/best-foods");

  const filePath = path.join(process.cwd(), "data", "ingredients.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const selectedFood = listFood.find((food) => food.id === foodId);
  if (!selectedFood) {
    return {
      props: {
        foodId,
        selectedFood: null,
        ingredients: data.ingredients,
      },
    };
  }

  return {
    props: {
      selectedFood: selectedFood,
      ingredients: data.ingredients,
    },
  };
}

export async function getStaticPaths() {
  const listFood = await foodApi.getFoods("/best-foods", {
    _page: 1,
    _limit: 16,
  });
  const paths = listFood.map((food) => ({ params: { foodId: food.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default FoodDetailPage;
