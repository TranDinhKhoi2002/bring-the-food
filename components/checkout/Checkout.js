import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import Cart from "../../components/cart/Cart";
import PreviewCart from "../../components/checkout/PreviewCart";
import TotalCart from "../../components/checkout/TotalCart";
import { selectFoodsFromCart } from "../../src/store/cart";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

function Checkout() {
  const cartFoods = useSelector(selectFoodsFromCart);

  return (
    <>
      {cartFoods.length > 0 && (
        <div className={cx("cart")}>
          <Grid container spacing={8} style={{ margin: "100px 0" }}>
            <Grid item xs={12} md={7}>
              <PreviewCart />
            </Grid>
            <Grid item xs={12} md={5}>
              <TotalCart />
            </Grid>
          </Grid>
        </div>
      )}
      {cartFoods.length === 0 && (
        <div className={cx("empty-cart")}>
          <Image src="/images/empty_cart.png" alt="" width={300} height={300} />
          <Typography variant="h3">There is no foods in your cart</Typography>
          <Link href="/">
            <Button className={cx("buy-btn")}>Buy Now</Button>
          </Link>
        </div>
      )}
      <Cart />
    </>
  );
}

export default Checkout;
