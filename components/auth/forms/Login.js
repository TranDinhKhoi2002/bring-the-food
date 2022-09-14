import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import InputField from "../../ui/input/InputField";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";

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

  const handleSubmitForm = () => {
    const [email, password] = getValues(["email", "password"]);
    console.log(email, password);
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
