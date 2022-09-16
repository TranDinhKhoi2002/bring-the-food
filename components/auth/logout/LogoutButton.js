import { useRouter } from "next/router";
import { useGoogleLogout } from "react-google-login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./LogoutButton.module.scss";
import { useState, useEffect } from "react";

const clientId =
  "28621200637-b33nlbjs4h5rpl5fp3d8tkdc3utp87fe.apps.googleusercontent.com";

function LogoutButton({ type }) {
  const router = useRouter();

  const onLogoutSuccess = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nameGg");
      localStorage.removeItem("imageGg");
      localStorage.removeItem("nameFb");
      localStorage.removeItem("imageFb");
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
  };

  const emailLogout = () => {
    localStorage.removeItem("username");
  };

  return (
    <button
      onClick={
        type === "gg" ? signOut : type === "fb" ? facebookLogout : emailLogout
      }
      className={styles.wrapper}
    >
      <LogoutIcon />
      Logout
    </button>
  );
}

export default LogoutButton;
