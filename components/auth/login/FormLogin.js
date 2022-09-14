import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import bannerFood from "../../../assets/images/banner_food.png";
import personalImg from "../../../assets/images/personal.svg";
import googleImg from "../../../assets/images/google.svg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FacebookIcon from "@mui/icons-material/Facebook";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { refreshToken } from "../../../src/utils/refreshToken";
import NotiToast from "../../ui/notification/NotiToast";
import { toast, ToastContainer } from "react-toastify";
import Login from "../forms/Login";
import Signup from "../forms/Signup";
import LoginLogoIcon from "../../ui/icons/LoginLogoIcon";

const cx = classNames.bind(styles);

const clientId =
  "28621200637-b33nlbjs4h5rpl5fp3d8tkdc3utp87fe.apps.googleusercontent.com";

function FormLogin() {
  const [loginWithEmailPhone, setLoginWithEmailPhone] = useState(false);
  const [loginWithFb, setLoginWithFb] = useState(false);
  const [signup, setSignup] = useState(false);
  const [optionsIsShow, setOptionsIsShow] = useState(true);
  const router = useRouter();

  const handleHideLoginEmailPhone = () => {
    if (optionsIsShow) {
      router.push("/");
    } else {
      setLoginWithEmailPhone(false);
      setSignup(false);
      setOptionsIsShow(true);
    }
  };

  const handleShowLoginEmailPhone = () => {
    setLoginWithEmailPhone(true);
    setSignup(false);
    setOptionsIsShow(false);
  };

  const handleCreateAccount = () => {
    setSignup(true);
    setLoginWithEmailPhone(false);
    setOptionsIsShow(false);
  };

  const onSuccess = (res) => {
    refreshToken(res);

    const user = res.profileObj;
    const { name, imageUrl } = user;

    localStorage.setItem("nameGg", name);
    localStorage.setItem("imageGg", imageUrl);
    router.replace("/");
  };

  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  // Remember to modify this logic
  const responseFacebook = (res) => {
    console.log(res);
    localStorage.setItem("nameFb", res.name);
    localStorage.setItem("imageFb", res.picture.data.url);
    router.replace("/");

    if (res.status === "unknown") {
      alert("Login failed");
      setLoginWithFb(false);
      return;
    }

    if (res.accessToken) {
      setLoginWithFb(true);
    } else {
      setLoginWithFb(false);
    }
  };

  const showToast = (title, desc, success) => {
    return toast(<NotiToast title={title} desc={desc} success={success} />, {
      position: toast.POSITION.TOP_RIGHT,
      className: cx("toast-wrapper"),
      closeButton: (
        <div style={{ position: "absolute", top: 8, right: 8, color: "#fff" }}>
          <ExitToAppIcon sx={{ width: "2rem", height: "2rem" }} />
        </div>
      ),
      autoClose: 3000,
    });
  };

  return (
    <div
      className={cx("form-login")}
      style={{
        backgroundImage: `url('${bannerFood.src}')`,
      }}
    >
      <div className={cx("box")}>
        <KeyboardBackspaceIcon
          onClick={handleHideLoginEmailPhone}
          sx={{
            position: "absolute",
            top: "50px",
            left: "20px",
            color: "#1976d2",
            fontSize: "2.6rem",
          }}
        />
        <div className={cx("box-main")}>
          <div className={cx("box-img")}>
            <LoginLogoIcon />
          </div>
          <div className={cx("box-heading")}>
            <h3>Welcome to our restaurant</h3>
          </div>
          <div className={cx("box-help")}>
            <p>
              Don&apos;t have an account?{" "}
              <span onClick={handleCreateAccount}>Create an account</span>
            </p>
          </div>
        </div>

        {loginWithEmailPhone && <Login />}

        {signup && <Signup />}

        {optionsIsShow && (
          <div className={cx("login-options")}>
            <div
              className={cx("login-option--email")}
              onClick={handleShowLoginEmailPhone}
            >
              <Image
                src={personalImg.src}
                width={100}
                height={100}
                alt="Personal image"
              />
              <span>Email Or Phone Number</span>
            </div>

            <div className={cx("login-option--google")} onClick={signIn}>
              <Image
                src={googleImg.src}
                width={100}
                height={100}
                alt="Google image"
              />
              <span>Login With Google</span>
            </div>

            {!loginWithFb && (
              <FacebookLogin
                appId="418153143755336"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                cssClass={cx("btn-login-fb")}
                icon={
                  <FacebookIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "2rem",
                      transform: "translateY(-50%)",
                      fontSize: "2.4rem",
                      color: "#4c69ba",
                      paddingRight: "2rem",
                    }}
                  />
                }
              />
            )}
          </div>
        )}
      </div>
      {/* <button onClick={() => showToast("aaaaa", "aaaa", true)}>Click</button> */}
      <ToastContainer />
    </div>
  );
}

export default FormLogin;
