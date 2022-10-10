import Banner from "../../components/shop/shopFoodDetail/Banner";
import DetailContainer from "../../components/shop/shopFoodDetail/DetailContainer";
import foodApi from "../../src/api/foodApi";

function FoodDetailPage(props) {
  const { foodId } = props;
  console.log(foodId);

  return (
    <div>
      <Banner />
      <DetailContainer />
    </div>
  );
}

// export const getStaticProps = wrapper.getStaticProps((store) => (ctx) => {
//   const { foodId } = ctx.params;
//   store.dispatch(foodActions.getFoodById(foodId));

//   return {
//     props: {
//       test: "aaa",
//     },
//   };
// });

export async function getStaticProps(context) {
  const { foodId } = context.params;

  return {
    props: {
      foodId,
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
