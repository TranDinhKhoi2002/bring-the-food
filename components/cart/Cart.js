import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsShowCart } from "../../src/store/cart";

function Cart() {
  const [isShow, setIsShow] = useState(false);
  const userAvatar = localStorage.getItem("userImg");
  const imgFb = localStorage.getItem("imgFb");

  const dispatch = useDispatch();
  const isShowCart = useSelector(selectIsShowCart);

  return <></>;
}

export default Cart;
