import classNames from "classnames/bind";
import styles from "./DetailImage.module.scss";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { useState } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function DetailImage({ food }) {
  return (
    <>
      {food && (
        <div className={cx("wrapper")}>
          <SideBySideMagnifier
            imageSrc={food.img}
            imageAlt={food.name}
            alwaysInPlace={true}
          />
        </div>
      )}
    </>
  );
}

export default DetailImage;
