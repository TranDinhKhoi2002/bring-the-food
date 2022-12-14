import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "react-google-login";
import Image from "next/image";
import FacebookLogin from "react-facebook-login";
import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FacebookIcon from "@mui/icons-material/Facebook";
import { refreshToken } from "../../../src/utils/refreshToken";
import { ToastContainer } from "react-toastify";
import Login from "../forms/Login";
import Signup from "../forms/Signup";
import LoginLogoIcon from "../../ui/icons/LoginLogoIcon";
import { authActions } from "../../../src/store/auth";

const cx = classNames.bind(styles);

const clientId =
  "28621200637-b33nlbjs4h5rpl5fp3d8tkdc3utp87fe.apps.googleusercontent.com";

function FormLogin() {
  const [loginWithEmailPhone, setLoginWithEmailPhone] = useState(false);
  const [signup, setSignup] = useState(false);
  const [optionsIsShow, setOptionsIsShow] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();

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

  const onSuccess = async (res) => {
    refreshToken(res);

    const { name, imageUrl, email } = res.profileObj;
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        type: "gg",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(authActions.login());

    localStorage.setItem("nameGg", name);
    localStorage.setItem("imageGg", imageUrl);
    localStorage.setItem("email", email);
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

  const responseFacebook = async (res) => {
    if (res.status === "unknown") {
      alert("Login failed");
      return;
    }

    localStorage.setItem("nameFb", res.name);
    localStorage.setItem("imageFb", res.picture.data.url);
    localStorage.setItem("email", res.email);

    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: res.email,
        type: "fb",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(authActions.login());
    router.replace("/");
  };

  return (
    <div
      className={cx("form-login")}
      style={{
        backgroundImage: `url('/images/banner_food.png')`,
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
            cursor: "pointer",
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
              className={cx("login-option")}
              onClick={handleShowLoginEmailPhone}
            >
              <Image
                src="/images/personal.svg"
                width={100}
                height={100}
                alt="Personal image"
              />
              <span>Login With Email</span>
            </div>

            <div className={cx("login-option")} onClick={signIn}>
              <Image
                src="/images/google.svg"
                width={100}
                height={100}
                alt="Google image"
              />
              <span>Login With Google</span>
            </div>

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
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default FormLogin;
