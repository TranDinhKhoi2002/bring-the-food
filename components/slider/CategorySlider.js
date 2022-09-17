import { DoubleArrow } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import styles from "./CategorySlider.module.scss";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const cx = classNames.bind(styles);

function CategorySlider({ categorySlider }) {
  // The default value is 'false', it will be used during pre-rendering and the first render in the browser (hydration)
  const [loaded, setLoaded] = useState(false);
  // During hydration `useEffect` is called. `window` is available in `useEffect`.
  // In this case because we know we're in the browser checking for window is not needed. If you need to read something from window that is fine.
  // By calling `setLoaded` in `useEffect` a render is triggered after hydrating, this causes the "browser specific" value to be available. In this case 'true'.
  // Texts in this component, there is no mismatch between what was rendered server-side vs what was rendered in the first render.
  // After useEffect runs the 'loaded' is set to 'true'

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <section className={cx("category")}>
          <Container>
            <div className={cx("category-container")}>
              <h6 className={cx("category-yellow-text")}>What we have?</h6>
              <h2 className={cx("category-heading-text")}>
                Browse food category
              </h2>
              <div className={cx("category-cards")}>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={2}
                  loop
                  loopFillGroupWithBlank={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
                  breakpoints={{
                    600: {
                      slidesPerView: 4,
                    },
                    960: {
                      slidesPerView: 7,
                    },
                  }}
                >
                  {categorySlider.map(({ img, name }, index) => (
                    <SwiperSlide key={index}>
                      <div className={cx("category-card")}>
                        <div className={cx("category-img")}>
                          <Image
                            src={img}
                            alt="Category card"
                            width={70}
                            height={70}
                          />
                        </div>
                        <div className={cx("category-card-desc")}>{name}</div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Button className="prev-btn">
                  <DoubleArrow sx={{ transform: "rotate(180deg)" }} />
                </Button>
                <Button className="next-btn">
                  <DoubleArrow />
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

export default CategorySlider;
