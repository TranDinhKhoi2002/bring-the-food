import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./PreviewCart.module.scss";

import { selectFoodsFromCart } from "../../src/store/cart";
import ImageWithFallback from "../shop/shopProduct/ImageWithFallback";

const cx = classNames.bind(styles);

function PreviewCart() {
  const cartFoods = useSelector(selectFoodsFromCart);
  console.log(cartFoods[0]);

  return (
    <div>
      <Typography variant="h2">Your Cart</Typography>
      <ul className={cx("cart")}>
        {cartFoods.map((item) => (
          <li key={item.food.id} className={cx("cart-item")}>
            <ImageWithFallback
              src={item.food.img}
              fallbackSrc="/images/foodFallbackImg.jpg"
              alt={item.food.name}
              width={120}
              height={120}
            />
            <Box className={cx("food-infor")}>
              <Typography variant="h5">{item.food.name}</Typography>
              <Typography variant="body1">{item.food.dsc}</Typography>
              <Typography variant="h5" className={cx("food-price")}>
                ${item.food.price} x {item.quantity}
              </Typography>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviewCart;
