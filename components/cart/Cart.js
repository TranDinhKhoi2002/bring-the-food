import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartActions,
  selectFoodsFromCart,
  selectIsShowCart,
} from "../../src/store/cart";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";

import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "../ui/dialog/Dialog";

const cx = classNames.bind(styles);

function Cart() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const router = useRouter();

  const userAvatar =
    typeof window !== "undefined" ? localStorage.getItem("userImg") : null;
  const imgFb =
    typeof window !== "undefined" ? localStorage.getItem("imgFb") : null;

  const dispatch = useDispatch();
  const isShowCart = useSelector(selectIsShowCart);
  const cartFoods = useSelector(selectFoodsFromCart);

  const handleHideCart = () => {
    dispatch(cartActions.showCart(false));
  };

  const handleBuyNow = () => {
    router.push("/popular-food");
    dispatch(cartActions.showCart(false));
  };

  const handleShowDialog = () => {
    if (!userAvatar && !imgFb) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
    dispatch(cartActions.showCart(false));
  };

  const handleRemoveFoodById = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <>
      <div className={cx("box", `${isShowCart ? "active" : ""}`)}>
        <Box>
          <Box>
            <Grid container alignItems="center" sx={{ p: 1.6 }}>
              <Grid item xs>
                <Typography
                  className={cx("heading")}
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ fontSize: { md: "2.6rem", xs: "2rem" } }}
                >
                  Your Cart
                </Typography>
              </Grid>

              <Grid item>
                <CancelPresentationIcon
                  className={cx("btn-close")}
                  onClick={handleHideCart}
                />
              </Grid>
            </Grid>

            <Divider />

            <div className={cx("box-main")}>
              {cartFoods.map((food, index) => (
                <Box key={index} className={cx("box-food")} sx={{ p: 1.6 }}>
                  <Image
                    src={food.food.img}
                    alt={food.food.name}
                    width={80}
                    height={80}
                  />
                  <Box className={cx("box-title")}>
                    <Typography variant="h5">{food.food.name}</Typography>
                    <Typography variant="body1">{`$${food.food.price} X ${food.quantity}`}</Typography>
                  </Box>
                  <Box
                    className={cx("delete-icon")}
                    onClick={() => handleRemoveFoodById(food.id)}
                  >
                    <DeleteIcon />
                  </Box>
                </Box>
              ))}
            </div>

            {cartFoods.length <= 0 && (
              <Box className={cx("empty-cart")}>
                <Image
                  src="/images/empty_cart.png"
                  className={cx("empty-img")}
                  width={300}
                  height={300}
                  alt="Empty Cart"
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    color: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  Your Cart Is Empty
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleBuyNow}
                  sx={{ marginTop: { md: "16px", xs: "24px" } }}
                  className={cx("btn-buy")}
                >
                  Buy now
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        {cartFoods.length > 0 && (
          <Button
            onClick={handleShowDialog}
            fullWidth
            className={cx("btn-checkout")}
            variant="contained"
            sx={{ width: { md: "400px", xs: "280px" } }}
          >
            Check out
          </Button>
        )}
      </div>

      <Dialog isShow={isShowDialog} onSetDialog={setIsShowDialog} />
      {isShowCart && <Box className="overlay" onClick={handleHideCart} />}
    </>
  );
}

export default Cart;
