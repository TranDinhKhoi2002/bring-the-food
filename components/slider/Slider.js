import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Link from "next/link";
import { sliderInfo } from "../../src/constants/sliderInfo";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Button, Grid, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const cx = classNames.bind(styles);

function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={true}
    >
      {sliderInfo.map((slider, index) => (
        <SwiperSlide key={index}>
          <div
            className={cx("background")}
            style={{ backgroundImage: `url('${slider.img.src}')` }}
          />
          <Grid container sx={{ maxWidth: 1200, margin: "0 auto !important" }}>
            <div className={cx("content")}>
              <div className={cx("content-title")}>{slider.title}</div>
              <div className={cx("content-desc")}>{slider.desc}</div>
              <span className={cx("content-desc--sub")}>{slider.subDesc}</span>
              <Link href="/popular-food">
                <Button
                  variant="contained"
                  className={cx("btn-order")}
                  size="large"
                >
                  <AddShoppingCartIcon />
                  <Typography pl={0.6} variant="h5">
                    Order Now
                  </Typography>
                </Button>
              </Link>
            </div>
          </Grid>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
