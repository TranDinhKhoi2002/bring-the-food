import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import InputField from "../../ui/input/InputField";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import NotiToast from "../../ui/notification/NotiToast";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(8, "Confirm password must be at least 8 characters")
    .test("equal-password", "Confirm password is incorrect", function (value) {
      if (value === undefined) return true;
      const { password } = this.parent;
      return value.match(password);
    }),
});

function Signup(props) {
  const { control, handleSubmit, register, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async () => {
    const [email, password] = getValues([
      "email",
      "password",
      "confirmPassword",
    ]);

    const signupData = {
      email,
      password,
    };
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422) {
      return toast(
        <NotiToast title={"Sign Up"} desc={data.message} success={false} />,
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

      <InputField
        className={cx("login-input")}
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        control={control}
        placeholder="Confirm your password"
        register={register}
      />

      <Button className={cx("btn-submit")} type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default Signup;
