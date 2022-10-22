import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./CommentInput.module.scss";

import DialogComponent from "../../../ui/dialog/Dialog";
import { Avatar, Button } from "@mui/material";
import { Star } from "@mui/icons-material";
import { commentActions } from "../../../../src/store/detailTab";

const cx = classNames.bind(styles);

function CommentInput() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const formRef = useRef();
  const textareaRef = useRef();

  const dispatch = useDispatch();

  const userAvarar =
    typeof window !== "undefined" && localStorage.getItem("imageGg");
  const imgFb =
    typeof window !== "undefined" && localStorage.getItem("imageFb");

  const postCommentHandler = () => {
    if (!userAvarar && !imgFb) {
      setIsShowDialog(true);
    } else {
      setIsShowDialog(false);
      dispatch(commentActions.addCommentToList(textareaRef.current.value));
      formRef.current.reset();
    }
  };

  return (
    <>
      <div className={cx("input")}>
        <Avatar
          src={userAvarar || imgFb}
          className={cx("input-avatar")}
          alt="Avatar"
        />
        <form ref={formRef} className={cx("input-form")}>
          <div className={cx("input-rate")}>
            <div className={cx("input-stars")}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <textarea
            className={cx("input-textarea")}
            ref={textareaRef}
            placeholder="Write your comment here..."
          />
          <Button onClick={postCommentHandler} className={cx("input-post-btn")}>
            Post Comment
          </Button>
        </form>
      </div>
      <DialogComponent isShow={isShowDialog} onSetDialog={setIsShowDialog} />
    </>
  );
}

export default CommentInput;
