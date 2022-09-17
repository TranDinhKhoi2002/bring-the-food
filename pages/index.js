import path from "path";
import fs from "fs/promises";

import Cart from "../components/cart/Cart";
import Intro from "../components/intro/Intro";
import Slider from "../components/slider/Slider";
import CategorySlider from "../components/slider/CategorySlider";
import ShopFood from "../components/shop/ShopFood";

function Home(props) {
  const { guides, mainSlider, categorySlider, shopInfor } = props;
  return (
    <>
      <Slider mainSlider={mainSlider} />
      <Cart />
      <Intro guides={guides} />
      <CategorySlider categorySlider={categorySlider} />
      <ShopFood shopInfor={shopInfor} />
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

  return {
    props: {
      guides: guidesData.guides,
      mainSlider: mainSliderData.sliders,
      categorySlider: categorySlider.sliders,
      shopInfor: shopInfor,
    },
  };
}

export default Home;
