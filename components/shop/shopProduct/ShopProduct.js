import { Box, Pagination } from "@mui/material";
import Image from "next/image";
import { FavoriteBorder, Room, ShoppingCart, Star } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./ShopProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../src/store/cart";
import foodApi from "../../../src/api/foodApi";
import {
  foodActions,
  selectFoodFilter,
  selectFoods,
} from "../../../src/store/food";
import { makeStyles } from "@mui/styles";
import Dialog from "../../ui/dialog/Dialog";
import { useEffect, useState } from "react";
import { selectIsLoggedIn } from "../../../src/store/auth";
import ImageWithFallback from "./ImageWithFallback";
import { toast } from "react-toastify";
import NotiToast from "../../ui/notification/NotiToast";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const cx = classNames.bind(styles);

const useStyles = makeStyles({
  pagination: {
    "& .Mui-selected": {
      backgroundColor: "#ff514e",
      color: "white",

      "&:hover": {
        backgroundColor: "#f73835",
      },
    },
  },
});

function ShopProduct({ foods, getFoodById }) {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [listFood, setListFood] = useState(foods);
  const filter = useSelector(selectFoodFilter);
  const fetchedFood = useSelector(selectFoods);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(foodActions.fetchFoodList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    setListFood(fetchedFood);
  }, [fetchedFood]);

  const styles = useStyles();

  const handleAddToCart = async (foodId) => {
    if (!isLoggedIn) {
      setIsShowDialog(true);
      return;
    }

    const selectedFood = await foodApi.getFoodById(foodId);
    dispatch(cartActions.addToCart({ food: selectedFood }));
    await fetch("/api/addToCart", {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        food: selectedFood,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
            <ExitToAppIcon
              sx={{ width: "2rem", height: "2rem", rotate: "180deg" }}
            />
          </div>
        ),
        autoClose: 3000,
      }
    );
  };

  const handlePagitionChange = (event, value) => {
    dispatch(foodActions.setFilter({ ...filter, _page: value }));
  };

  return (
    <Box>
      {listFood.length > 0 ? (
        <div>
          <div className={cx("products")}>
            {listFood.map((food, index) => (
              <div key={index} className={cx("product")}>
                <div
                  className={cx("product-main")}
                  onClick={() => getFoodById(food.id)}
                >
                  <div className={cx("product-img-wrapper")}>
                    <div className={cx("product-img-container")}>
                      <ImageWithFallback
                        src={food.img}
                        fallbackSrc="/images/foodFallbackImg.jpg"
                        className={cx("product-img")}
                        alt={food.name}
                        layout="fill"
                      />
                    </div>
                    <div className={cx("product-rate")}>
                      <Star />
                      <span>{food.rate}</span>
                    </div>
                  </div>

                  <div className={cx("product-content")}>
                    <h2 className={cx("product-name")} title={food.name}>
                      {food.name}
                    </h2>
                    <p className={cx("product-desc")}>{food.dsc}</p>
                    <div className={cx("product-row")}>
                      <div className={cx("product-location")}>
                        <Room />
                        <span>{food.country}</span>
                      </div>
                      <div
                        className={cx("product-price")}
                      >{`$${food.price}`}</div>
                    </div>
                  </div>
                </div>

                <div className={cx("product-buttons")}>
                  <div className={cx("product-button")}>
                    <FavoriteBorder />
                  </div>
                  <div
                    className={cx("product-button")}
                    onClick={() => {
                      handleAddToCart(food.id);
                    }}
                  >
                    <ShoppingCart />
                  </div>
                </div>

                <div className={cx("product-label")}>Favourite</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={cx("product-empty")}>
          <Image
            src="/images/empty-shop.svg"
            width={400}
            height={400}
            alt="There is no foods"
          />
          <div>There is no product you are looking for</div>
        </div>
      )}

      <div className={cx("pagination")}>
        <Pagination
          count={4}
          page={filter._page}
          onChange={handlePagitionChange}
          shape="rounded"
          className={styles.pagination}
        />
      </div>

      <Dialog isShow={isShowDialog} onSetDialog={setIsShowDialog} />
      {isShowDialog && (
        <Box
          className="overlay"
          onClick={() => {
            setIsShowDialog(false);
          }}
        />
      )}
    </Box>
  );
}

export default ShopProduct;
