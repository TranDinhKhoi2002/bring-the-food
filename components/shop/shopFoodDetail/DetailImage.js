import classNames from "classnames/bind";
import styles from "./DetailImage.module.scss";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { useSelector } from "react-redux";
import { selectFoods } from "../../../src/store/food";

const cx = classNames.bind(styles);

function DetailImage({ src, name }) {
  return (
    <div className={cx("wrapper")}>
      <SideBySideMagnifier
        imageSrc={src}
        imageAlt={name}
        alwaysInPlace={true}
      />
    </div>
  );
}

export default DetailImage;
