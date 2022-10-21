import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./DetailContainer.module.scss";
import { Grid } from "@mui/material";
import DetailImage from "./DetailImage";
import DetailInfor from "./DetailInfor";
import Cart from "../../cart/Cart";
import { selectFoodById } from "../../../src/store/food";

const cx = classNames.bind(styles);

function DetailContainer() {
  const foodById = useSelector(selectFoodById);

  return (
    <div className={cx("wrapper")}>
      <Grid container maxWidth="lg" className={cx("grid")}>
        <Grid item xs={12} md={6}>
          <DetailImage food={foodById} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailInfor food={foodById} />
        </Grid>
      </Grid>
      <Cart />
    </div>
  );
}

export default DetailContainer;
