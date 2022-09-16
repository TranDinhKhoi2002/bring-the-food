import { Container } from "@mui/material";
import classNames from "classnames/bind";
import { Swiper } from "swiper/react";
import styles from "./CategorySlider.module.scss";

const cx = classNames.bind(styles);

function CategorySlider(props) {
  return (
    <section className={cx("category")}>
      <Container>
        <div className={cx("category-container")}>
          <div className={cx("category-yellow-text")}>What we have?</div>
          <h2 className={cx("category-heading-text")}>Browse food category</h2>
          <div className={cx("category-cards")}>
            <Swiper
              slidesPerView={2}
              loop
              loopFillGroupWithBlank={true}
              autoplay={{ delay: 1500, disableOnInteraction: false }}
              navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
              breakpoints={{
                600: {
                  slidesPerView: 4,
                },
                960: {
                  slidesPerView: 7,
                },
              }}
            ></Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CategorySlider;
