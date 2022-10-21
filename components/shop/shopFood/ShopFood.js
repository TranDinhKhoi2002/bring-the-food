import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { foodActions, selectFoodFilter } from "../../../src/store/food";
import foodApi from "../../../src/api/foodApi";
import ShopFilter from "../shopFilter/ShopFilter";
import ShopSearch from "../shopSearch/ShopSearch";
import ShopProduct from "../shopProduct/ShopProduct";

function ShopFood({ shopInfor, listFood }) {
  const { foodTypes, priceOptions } = shopInfor;
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector(selectFoodFilter);

  const handleGetFoodByType = async (index) => {
    switch (index) {
      case 1:
        const burgersFood = await foodApi.getFoods("/burgers", filter);
        dispatch(foodActions.fetchBurgersFood(burgersFood));
        localStorage.setItem("listFood", JSON.stringify(burgersFood));
        break;
      case 2:
        const breadsFood = await foodApi.getFoods("/breads", filter);
        dispatch(foodActions.fetchBreadsFood(breadsFood));
        localStorage.setItem("listFood", JSON.stringify(breadsFood));
        break;
      case 3:
        const sandwitchesFood = await foodApi.getFoods("/sandwiches", filter);
        dispatch(foodActions.fetchSandwichesFood(sandwitchesFood));
        localStorage.setItem("listFood", JSON.stringify(sandwitchesFood));
        break;
      case 4:
        const drinksFood = await foodApi.getFoods("/drinks", filter);
        dispatch(foodActions.fetchDrinksFood(drinksFood));
        localStorage.setItem("listFood", JSON.stringify(drinksFood));
        break;
      case 5:
        const pizzasFood = await foodApi.getFoods("/pizzas", filter);
        dispatch(foodActions.fetchPizzasFood(pizzasFood));
        localStorage.setItem("listFood", JSON.stringify(pizzasFood));
        break;
      default:
        break;
    }
  };

  const handleFilterFoodByPrice = (index) => {
    switch (index) {
      case 1:
        const filterUnder100 = { _page: 1, _limit: 16, price_lte: 100 };
        dispatch(foodActions.setFilter(filterUnder100));
        break;
      case 2:
        const filterAbove100 = { _page: 1, _limit: 16, price_gte: 100 };
        dispatch(foodActions.setFilter(filterAbove100));
        break;
      case 3:
        const filterUnder50 = { _page: 1, _limit: 16, price_lte: 50 };
        dispatch(foodActions.setFilter(filterUnder50));
        break;
      case 4:
        const filter50To100 = {
          _page: 1,
          _limit: 16,
          price_gte: 50,
          price_lte: 100,
        };
        dispatch(foodActions.setFilter(filter50To100));
        break;
      default:
        break;
    }
  };

  const handleVoteByStars = (stars) => {
    const filterByStars = { _page: 1, _limit: 16, rate_like: stars };
    dispatch(foodActions.setFilter(filterByStars));
  };

  const handleFoodSearch = (e) => {
    const filter = { _page: 1, _limit: 16, name_like: e.target.value };
    dispatch(foodActions.setFilterWidthDebounce(filter));
  };

  const navigateToDetailFood = (id) => {
    router.push(`/shop/${id}`);
  };

  return (
    <Grid container maxWidth="lg" sx={{ margin: "0 auto" }}>
      <Grid item xs={12} md={2}>
        <ShopFilter
          foodTypes={foodTypes}
          priceOptions={priceOptions}
          onSubmitFood={handleGetFoodByType}
          onSubmitPrice={handleFilterFoodByPrice}
          onFilterByStars={handleVoteByStars}
        />
      </Grid>
      <Grid item xs={12} md={10}>
        <ShopSearch onFoodSearch={handleFoodSearch} />
        <ShopProduct getFoodById={navigateToDetailFood} foods={listFood} />
      </Grid>
    </Grid>
  );
}

export default ShopFood;
