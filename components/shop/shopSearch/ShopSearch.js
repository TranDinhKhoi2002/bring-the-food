import { Search, ViewComfy, ViewList } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./ShopSearch.module.scss";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectFoods } from "../../../src/store/food";

const cx = classNames.bind(styles);

function ShopSearch({ onFoodSearch }) {
  const [gridView, setGridView] = useState();
  const [columnView, setColumnView] = useState();
  const ref = useRef();

  const foods = useSelector(selectFoods);

  useEffect(() => {
    setGridView(true);
    setColumnView(false);
  }, []);

  let shopProduct;
  if (typeof window !== "undefined") {
    shopProduct = document.querySelector(".products");
  }

  const handleClickSearch = () => {
    ref.current.reset();
  };

  const handleSetGridView = () => {
    if (shopProduct && foods.length > 0) {
      setGridView(true);
      setColumnView(false);
      shopProduct.classList.remove("shop-product-column");
    }
  };

  const handleSetColumnView = () => {
    if (shopProduct && foods.length > 0) {
      setGridView(false);
      setColumnView(true);
      shopProduct.classList.add("shop-product-column");
    }
  };

  return (
    <div className={cx("actions")}>
      <form className={cx("actions-search")} ref={ref}>
        <input placeholder="Search foods" onChange={onFoodSearch} />
        <div className={cx("actions-search-btn")} onClick={handleClickSearch}>
          <Search />
        </div>
      </form>

      <div className={cx("display-types")}>
        <ViewComfy
          onClick={handleSetGridView}
          className={cx("display-type", `${gridView && "active"}`)}
        />
        <ViewList
          onClick={handleSetColumnView}
          className={cx("display-type", `${columnView && "active"}`)}
        />
      </div>
    </div>
  );
}

export default ShopSearch;
