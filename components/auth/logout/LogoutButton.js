import { useRouter } from "next/router";
import { useGoogleLogout } from "react-google-login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./LogoutButton.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../../src/store/auth";
import { cartActions } from "../../../src/store/cart";

const clientId =
  "28621200637-b33nlbjs4h5rpl5fp3d8tkdc3utp87fe.apps.googleusercontent.com";

function LogoutButton({ type }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nameGg");
      localStorage.removeItem("imageGg");
      localStorage.removeItem("email");

      dispatch(authActions.logout());
      dispatch(cartActions.clearCart());
      router.replace("/");
    }
  };

  const onFailure = () => {
    if (typeof window === "undefined") {
      return;
    }

    console.log("failed");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const facebookLogout = () => {
    localStorage.removeItem("imageFb");
    localStorage.removeItem("nameFb");
    localStorage.removeItem("email");

    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
  };

  const emailLogout = () => {
    localStorage.removeItem("username");
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
  };

  return (
    <button
      onClick={
        type === "gg" ? signOut : type === "fb" ? facebookLogout : emailLogout
      }
      className={styles.wrapper}
    >
      <LogoutIcon sx={{ fontSize: 28 }} />
      Logout
    </button>
  );
}

export default LogoutButton;
