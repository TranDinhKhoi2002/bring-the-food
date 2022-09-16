import path from "path";
import fs from "fs/promises";

import Cart from "../components/cart/Cart";
import Intro from "../components/intro/Intro";
import Slider from "../components/slider/Slider";
import CategorySlider from "../components/slider/CategorySlider";

function Home(props) {
  const { guides, mainSlider } = props;
  return (
    <>
      <Slider mainSlider={mainSlider} />
      <Cart />
      <Intro guides={guides} />
      <CategorySlider />
    </>
  );
}

export async function getStaticProps() {
  let filePath = path.join(process.cwd(), "data", "guides.json");
  let jsonData = await fs.readFile(filePath);
  const guidesData = JSON.parse(jsonData);

  filePath = path.join(process.cwd(), "data", "mainSlider.json");
  jsonData = await fs.readFile(filePath);
  const mainSliderData = JSON.parse(jsonData);

  return {
    props: {
      guides: guidesData.guides,
      mainSlider: mainSliderData.sliders,
    },
  };
}

export default Home;
