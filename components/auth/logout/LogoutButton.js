import { useRouter } from "next/router";
import { useGoogleLogout } from "react-google-login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./LogoutButton.module.scss";

const clientId =
  "28621200637-lrridduvsj91kgdmnrb7kugcpk4qnnpk.apps.googleusercontent.com";

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
    alert("Logout failed!");
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

  return (
    <button
      onClick={type === "gg" ? signOut : facebookLogout}
      className={styles.wrapper}
    >
      <LogoutIcon />
      Logout
    </button>
  );
}

export default LogoutButton;
