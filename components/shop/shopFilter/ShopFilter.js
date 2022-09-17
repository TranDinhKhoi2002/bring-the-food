import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./ShopFilter.module.scss";

const cx = classNames.bind(styles);

function ShopFilter({
  onSubmitFood,
  onSubmitPrice,
  onVoteFiveStars,
  onVoteFourStars,
  onVoteThreeStars,
  foodTypes,
  priceOptions,
}) {
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
            className={cx("filter-item")}
          >
            <Image src={img} alt="Types food" width={50} height={50} />
            <span className={cx("filter-item-name")}>{name}</span>
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
                  className={cx("radio")}
                  sx={{ color: "#ff514e !important" }}
                />
              }
              label={option}
              sx={{ flexShrink: 0, fontSize: "1.6rem" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default ShopFilter;
