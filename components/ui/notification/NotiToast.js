import { Done, Warning } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames/bind";
import styles from "./NotiToast.module.scss";

const cx = classNames.bind(styles);

function NotiToast({ title, desc, success }) {
  return (
    <div className={cx("toast-wrapper")}>
      <div className={cx("toast-icon")}>
        {success ? (
          <Done sx={{ color: "#20bf6b" }} />
        ) : (
          <Warning sx={{ color: "#3598db" }} />
        )}
      </div>
      <div className={cx("toast-content")}>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default NotiToast;
