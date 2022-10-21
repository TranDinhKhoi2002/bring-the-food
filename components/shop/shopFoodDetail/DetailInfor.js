import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Add,
  AddShoppingCart,
  EventAvailable,
  ExitToApp,
  LocalShipping,
  Loyalty,
  Remove,
  Star,
  StarBorder,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./DetailInfor.module.scss";
import { cartActions } from "../../../src/store/cart";
import { toast } from "react-toastify";
import NotiToast from "../../ui/notification/NotiToast";

const cx = classNames.bind(styles);

function DetailInfor({ food }) {
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const changePriceAndAmountHandler = (amount) => {
    setPrice(food.price * amount);
    setAmount(amount);
  };

  const decrementHandler = () => {
    if (amount === 1) {
      return;
    }
    setAmount((prevState) => prevState - 1);
    setPrice(food.price * (amount - 1));
  };

  const incrementHandler = () => {
    setAmount((prevState) => prevState + 1);
    setPrice(food.price * (amount + 1));
  };

  const addToCartHandler = (food, quantity) => {
    dispatch(cartActions.addWithQuantity({ food, quantity }));
    return toast(
      <NotiToast
        title="Cart"
        desc="Added food to cart successfully"
        success={true}
      />,
      {
        position: toast.POSITION.TOP_LEFT,
        className: cx("toast-wrapper"),
        closeButton: (
          <div
            style={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
          >
            <ExitToApp
              sx={{ width: "2rem", height: "2rem", rotate: "180deg" }}
            />
          </div>
        ),
        autoClose: 3000,
      }
    );
  };

  return (
    <>
      {food && (
        <div className={cx("detail")}>
          <h2 className={cx("detail-title")}>{food.name}</h2>
          <div className={cx("detail-rate")}>
            <div className={cx("detail-rate-stars")}>
              <Star />
              <Star />
              <Star />
              <Star />
              {food.rate === 5 ? <Star /> : <StarBorder />}
            </div>
            <div className={cx("detail-reviews")}>
              <span>Customer Reviews</span>
            </div>
          </div>

          <div className={cx("detail-price")}>
            <strong>${price || food.price}</strong>
          </div>

          <div className={cx("detail-tags")}>
            <div className={cx("detail-tag-item")}>
              <span className={cx("tag-label")}>Category: </span>
              <span className={cx("tag-label-value")}>Food</span>
            </div>
            <div className={cx("detail-tag-item")}>
              <span className={cx("tag-label")}>Country: </span>
              <span className={cx("tag-label-value")}>{food.country}</span>
            </div>
          </div>

          <p className={cx("detail-description")}>{food.dsc}</p>

          <form className={cx("detail-form")}>
            <h2 className={cx("detail-form-title")}>Choose your options</h2>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="amount"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  label="Buy 2 products"
                  value="Buy 2 products"
                  control={
                    <Radio
                      checked={amount === 2}
                      className={cx("amount-btn")}
                      sx={{
                        color: "#ff514e !important",
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                      onClick={() => changePriceAndAmountHandler(2)}
                    />
                  }
                />

                <FormControlLabel
                  label="Buy 3 products"
                  value="Buy 3 products"
                  control={
                    <Radio
                      checked={amount === 3}
                      className={cx("amount-btn")}
                      sx={{
                        color: "#ff514e !important",
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                      onClick={() => changePriceAndAmountHandler(3)}
                    />
                  }
                />

                <FormControlLabel
                  label="Buy 5 products"
                  value="Buy 5 products"
                  control={
                    <Radio
                      checked={amount === 5}
                      className={cx("amount-btn")}
                      sx={{
                        color: "#ff514e !important",
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                      onClick={() => changePriceAndAmountHandler(5)}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </form>

          <div className={cx("detail-buttons")}>
            <div className={cx("detail-amount-buttons")}>
              <Button
                className={cx("decrease-button", "circle-button")}
                onClick={decrementHandler}
                disabled={amount === 1}
              >
                <Remove sx={{ color: "rgba(0, 0, 0, 0.6) !important" }} />
              </Button>
              <span className={cx("food-amount")}>{amount}</span>
              <Button
                className={cx("increase-button", "circle-button")}
                onClick={incrementHandler}
              >
                <Add sx={{ color: "rgba(0, 0, 0, 0.6) !important" }} />
              </Button>
            </div>

            <div className={cx("detail-add-button")}>
              <Button
                className={cx("add-button")}
                sx={{ width: { md: "300px", xs: "240px" } }}
                onClick={() => {
                  addToCartHandler(food, amount);
                }}
              >
                <AddShoppingCart />
                <span>Add to cart</span>
              </Button>
            </div>
          </div>

          <div className={cx("detail-commits")}>
            <div className={cx("detail-commit-item")}>
              <LocalShipping />
              <span>Free global shipping on all orders</span>
            </div>
            <div className={cx("detail-commit-item")}>
              <EventAvailable />
              <span>2 hours easy returns if you change your mind</span>
            </div>
            <div className={cx("detail-commit-item")}>
              <Loyalty />
              <span>Order before noon for same day dispatch</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailInfor;
