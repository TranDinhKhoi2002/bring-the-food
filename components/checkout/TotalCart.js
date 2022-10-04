import { useSelector } from "react-redux";
import { selectFoodsFromCart } from "../../src/store/cart";
import classNames from "classnames/bind";
import styles from "./TotalCart.module.scss";
import { Button } from "@mui/material";
import Link from "next/link";

const cx = classNames.bind(styles);

function TotalPrice() {
  const cartFoods = useSelector(selectFoodsFromCart);

  const totalPrice = cartFoods.reduce((acc, item) => {
    return acc + item.food.price * item.quantity;
  }, 0);

  return (
    <>
      <div className={cx("cart-total")}>
        <div className={cx("cart-price")}>
          <span>Price:</span>
          <span>${totalPrice}</span>
        </div>
        <div className={cx("cart-price")}>
          <span>Transport Fee:</span>
          <span>Free</span>
        </div>
        <div className={cx("cart-price")}>
          <span>Discount:</span>
          <span>$0</span>
        </div>
        <div className={cx("cart-price")}>
          <span>TOTAL:</span>
          <span>${totalPrice}</span>
        </div>
      </div>
      <Link href="/checkout/shipping">
        <Button className={cx("pay-btn")}>Pay Now</Button>
      </Link>
      <div className={cx("shopping-btn")}>
        <Link href="/">Continue shopping</Link>
      </div>
    </>
  );
}

export default TotalPrice;
