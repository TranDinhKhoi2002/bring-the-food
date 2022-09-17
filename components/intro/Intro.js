import { Box, Grid, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Intro.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

function Intro({ guides }) {
  return (
    <Box maxWidth="lg" sx={{ margin: "60px auto" }}>
      <Box>
        <Typography variant="h6" className={cx("intro-title")}>
          Order Now!
        </Typography>
        <Typography variant="h4" className={cx("intro-desc")}>
          How it works
        </Typography>
      </Box>
      <Grid container mt={6}>
        {guides.map((guide, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            lg={3}
            className={cx("intro-guide")}
            sx={{ p: { xs: "12px" } }}
          >
            <Image
              src={guide.img}
              alt="Shipping guides"
              width={160}
              height={160}
            />
            <Box
              className={cx("intro-step")}
              sx={{ top: { md: "4px", xs: "12px" }, right: { md: 40, xs: 80 } }}
            >
              <span>{`0${index + 1}`}</span>
              <span>STEP</span>
            </Box>
            {index !== 3 && (
              <Box
                className={cx("intro-arrow")}
                sx={{
                  backgroundImage: { xs: "unset", lg: `url('${guide.arrow}')` },
                  position: {
                    xs: "unset !important",
                    lg: "absolute !important",
                  },
                }}
              />
            )}
            <Box>
              <Typography
                variant="h5"
                align="center"
                className={cx("intro-infor")}
              >
                {guide.info}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Intro;
