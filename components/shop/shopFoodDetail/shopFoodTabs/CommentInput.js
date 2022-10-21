import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function CommentInput() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const ref = useRef();

  const dispatch = useDispatch();

  return <div></div>;
}

export default CommentInput;
