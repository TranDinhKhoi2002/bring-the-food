import { Star, StarBorder } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ShopFilter.module.scss";

const cx = classNames.bind(styles);

const useStyles = makeStyles({
  btnRadio: {
    "& .MuiSvgIcon-root": {
      width: "2rem !important",
      height: "2rem !important",
      marginBottom: "1px",
    },
    "& ~ .MuiFormControlLabel-label": {
      fontSize: "1.4rem !important",
    },
  },
});

function ShopFilter({
  onSubmitFood,
  onSubmitPrice,
  onFilterByStars,
  foodTypes,
  priceOptions,
}) {
  const [classes, setClasses] = useState();
  const styles = useStyles();

  useEffect(() => {
    setClasses(styles.btnRadio);
  }, [styles.btnRadio]);

  const handleSubmitTypeFood = (index) => {
    onSubmitFood(index);
  };

  const handleSubmitPrice = (index) => {
    onSubmitPrice(index);
  };

  return (
    <div className={cx("filters")}>
      <h2 className={cx("filters-title")}>Popular</h2>
      <ul className={cx("filters-list")}>
        {foodTypes.map(({ img, name }, index) => (
          <li
            key={index}
            onClick={() => handleSubmitTypeFood(index + 1)}
            className={cx("filters-item")}
          >
            <Image src={img} alt="Types food" width={22} height={22} />
            <span className={cx("filters-item-name")}>{name}</span>
          </li>
        ))}
      </ul>

      <h2 className={cx("filters-title")}>Price</h2>
      <FormControl component="fieldset" sx={{ padding: "2px 0 2px 8px" }}>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {priceOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              onClick={() => handleSubmitPrice(index + 1)}
              value={option}
              control={
                <Radio
                  className={classes}
                  sx={{ color: "#ff514e !important" }}
                />
              }
              label={option}
              sx={{ flexShrink: 0, fontSize: "1.6rem" }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <h2 className={cx("filters-title")}>Rate</h2>
      <div
        className={cx("filters-stars", "five-stars")}
        onClick={() => {
          onFilterByStars(5);
        }}
      >
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <div
        className={cx("filters-stars", "four-stars")}
        onClick={() => {
          onFilterByStars(4);
        }}
      >
        <Star />
        <Star />
        <Star />
        <Star />
        <StarBorder />
      </div>
      <div
        className={cx("filters-stars", "three-stars")}
        onClick={() => {
          onFilterByStars(3);
        }}
      >
        <Star />
        <Star />
        <Star />
        <StarBorder />
        <StarBorder />
      </div>
    </div>
  );
}

export default ShopFilter;
