import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { selectListComment } from "../../../src/store/detailTab";
import CommentTab from "./shopFoodTabs/CommentTab";
import DescriptionTab from "./shopFoodTabs/DescriptionTab";
import styles from "./DetailTabs.module.scss";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

function DetailTabs({ ingredients }) {
  const [isShowDesc, setIsShowDesc] = useState(true);
  const userAvarar =
    typeof window !== "undefined" && localStorage.getItem("imageGg");
  const imgFb =
    typeof window !== "undefined" && localStorage.getItem("imageFb");

  const comments = useSelector(selectListComment);

  return (
    <div className={cx("detail-tab")}>
      <div className={cx("detail-tab-buttons")}>
        <div className={cx("detail-tab-button")}>
          <Button
            className={cx(isShowDesc ? "active" : "button-tab", "mui-button")}
            onClick={() => setIsShowDesc(true)}
            variant="contained"
          >
            Description
          </Button>
        </div>

        <div className={cx("detail-tab-button")}>
          <Button
            className={cx(!isShowDesc ? "active" : "button-tab", "mui-button")}
            onClick={() => setIsShowDesc(false)}
            variant="contained"
          >
            Comments {(userAvarar || imgFb) && `(${comments.length})`}
          </Button>
        </div>

        <div className={cx("detail-tab-button-bg")}></div>
      </div>
      {isShowDesc ? (
        <DescriptionTab ingredients={ingredients} />
      ) : (
        <CommentTab />
      )}
    </div>
  );
}

export default DetailTabs;
