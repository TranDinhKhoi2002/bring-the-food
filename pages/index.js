import path from "path";
import fs from "fs/promises";

import Cart from "../components/cart/Cart";
import Intro from "../components/intro/Intro";
import Slider from "../components/slider/Slider";
import CategorySlider from "../components/slider/CategorySlider";
import ShopFood from "../components/shop/shopFood/ShopFood";
import foodApi from "../src/api/foodApi";

function Home(props) {
  const { guides, mainSlider, categorySlider, shopInfor, listFood } = props;
  return (
    <>
      <Slider mainSlider={mainSlider} />
      <Cart />
      <Intro guides={guides} />
      <CategorySlider categorySlider={categorySlider} />
      <ShopFood shopInfor={shopInfor} listFood={listFood} />
    </>
  );
}

const getDataFromFile = async (fileName) => {
  const filePath = path.join(process.cwd(), "data", fileName);
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
};

export async function getStaticProps() {
  const guidesData = await getDataFromFile("guides.json");
  const mainSliderData = await getDataFromFile("mainSlider.json");
  const categorySlider = await getDataFromFile("categorySlider.json");
  const shopInfor = await getDataFromFile("shopInfor.json");

  if (!guidesData || !mainSliderData || !categorySlider || !shopInfor) {
    return {
      redirect: {
        destination: "/error",
      },
    };
  }

  const listFood = await foodApi.getFoods("/best-foods", {
    _page: 1,
    _limit: 16,
  });

  return {
    props: {
      guides: guidesData.guides,
      mainSlider: mainSliderData.sliders,
      categorySlider: categorySlider.sliders,
      shopInfor: shopInfor,
      listFood: listFood,
    },
  };
}

export default Home;
