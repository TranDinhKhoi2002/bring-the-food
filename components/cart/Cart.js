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
import { ToastContainer, toast } from "react-toastify";
import NotiToast from "../ui/notification/NotiToast";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ImageWithFallback from "../shop/shopProduct/ImageWithFallback";

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

  const handleCheckout = () => {
    dispatch(cartActions.showCart(false));
    router.push("/checkout");
  };

  const handleRemoveFromCart = (id) => {
    dispatch(cartActions.removeFromCart(id));
    fetch("/api/removeFromCart", {
      method: "DELETE",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        foodId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    showToast("Cart", "Removed food from cart successfully", true);
  };

  const hanleRemoveEntireFood = (id) => {
    dispatch(cartActions.removeEntireFood(id));
    fetch("/api/removeEntireFood", {
      method: "DELETE",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        foodId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    showToast("Cart", "Removed food from cart successfully", true);
  };

  const handleAddToCart = (food) => {
    dispatch(cartActions.addToCart(food));
    fetch("/api/addToCart", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        food: food.food,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    showToast("Cart", "Added food from cart successfully", true);
  };

  const showToast = (title, desc, success) => {
    return toast(<NotiToast title={title} desc={desc} success={success} />, {
      position: toast.POSITION.TOP_LEFT,
      className: cx("toast-wrapper"),
      closeButton: (
        <div style={{ position: "absolute", top: 8, right: 8, color: "#fff" }}>
          <ExitToAppIcon
            sx={{ width: "2rem", height: "2rem", rotate: "180deg" }}
          />
        </div>
      ),
      autoClose: 3000,
    });
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
                  <ImageWithFallback
                    src={food.food.img}
                    fallbackSrc="/images/foodFallbackImg.jpg"
                    alt={food.food.name}
                    width={80}
                    height={80}
                  />
                  <Box className={cx("box-title")}>
                    <Typography variant="h5">{food.food.name}</Typography>
                    <Typography variant="body1">{`$${food.food.price}`}</Typography>
                    <Box className={cx("box-amount")}>
                      <span
                        onClick={() => {
                          handleRemoveFromCart(food.food.id);
                        }}
                      >
                        -
                      </span>
                      <span>{food.quantity}</span>
                      <span
                        onClick={() => {
                          handleAddToCart(food);
                        }}
                      >
                        +
                      </span>
                    </Box>
                  </Box>
                  <Box
                    className={cx("delete-icon")}
                    onClick={() => {
                      hanleRemoveEntireFood(food.food.id);
                    }}
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
            onClick={handleCheckout}
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

      <ToastContainer />
    </>
  );
}

export default Cart;
