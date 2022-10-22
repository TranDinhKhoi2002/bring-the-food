import { useSelector } from "react-redux";
import { selectListComment } from "../../../../src/store/detailTab";
import classNames from "classnames/bind";
import styles from "./CommentTab.module.scss";
import { Avatar } from "@mui/material";
import CommentInput from "./CommentInput";

const cx = classNames.bind(styles);

function CommentTab() {
  const userAvarar =
    typeof window !== "undefined" && localStorage.getItem("imageGg");
  const imgFb =
    typeof window !== "undefined" && localStorage.getItem("imageFb");

  const nameGg =
    typeof window !== "undefined" && localStorage.getItem("nameGg");
  const nameFb =
    typeof window !== "undefined" && localStorage.getItem("nameFb");

  const comments = useSelector(selectListComment);
  if (typeof window !== "undefined") {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  return (
    <div>
      {(userAvarar || imgFb) && (
        <div className={cx("comments")}>
          {comments.map((comment, index) => (
            <div key={index} className={cx("comments-main")}>
              <Avatar
                className={cx("comments-img")}
                alt="Avatar"
                src={userAvarar || imgFb}
              />
              <div>
                <h4 className={cx("comments-heading")}>{nameGg || nameFb}</h4>
                <p className={cx("comments-content")}>{comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <CommentInput />
    </div>
  );
}

export default CommentTab;
