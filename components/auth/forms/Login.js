import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InputField from "../../ui/input/InputField";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import NotiToast from "../../ui/notification/NotiToast";
import { authActions } from "../../../src/store/auth";

const cx = classNames.bind(styles);

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Your email is invalid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function Login(props) {
  const { control, handleSubmit, register, getValues } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmitForm = async () => {
    const [email, password] = getValues(["email", "password"]);
    const loginBody = { email, password, type: "email" };

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      localStorage.setItem("username", email);
      dispatch(authActions.login());
      router.replace("/");
    } else {
      const data = await res.json();
      return toast(
        <NotiToast title={"Login"} desc={data.message} success={false} />,
        {
          position: toast.POSITION.TOP_RIGHT,
          className: cx("toast-wrapper"),
          closeButton: (
            <div
              style={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
            >
              <ExitToAppIcon sx={{ width: "2rem", height: "2rem" }} />
            </div>
          ),
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <form
      className={cx("login-inputs")}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <InputField
        className={cx("login-input")}
        name="email"
        type="email"
        label="Email Address"
        control={control}
        placeholder="Email/Phone Number"
        register={register}
      />

      <InputField
        className={cx("login-input")}
        name="password"
        type="password"
        label="Password"
        control={control}
        placeholder="Enter your password"
        register={register}
      />

      <Button className={cx("btn-submit")} type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default Login;
