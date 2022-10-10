import classNames from "classnames/bind";
import styles from "./DetailContainer.module.scss";
import { Grid } from "@mui/material";
import DetailImage from "./DetailImage";
import DetailInfor from "./DetailInfor";
import Cart from "../../cart/Cart";

const cx = classNames.bind(styles);

function DetailContainer() {
  return (
    <div className={cx("wrapper")}>
      <Grid container maxWidth="lg" className={cx("grid")}>
        <Grid item xs={12} md={6}>
          <DetailImage
            src="https://goldbelly.imgix.net/uploads/showcase_media_asset/image/132987/traditional-meat-empanadas-with-llajua-sauce-12-pack.f2adcfeb4ccf027675047f1367ce83ca.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1"
            name="test"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailInfor
            food={{
              price: 20,
              name: "Chef Francis Mallmann",
              rate: 5,
              dsc: "Traditional Beef Empanadas with Llajua Sauce - 12 Pack",
              country: "VN",
            }}
          />
        </Grid>
      </Grid>
      <Cart />
    </div>
  );
}

export default DetailContainer;
