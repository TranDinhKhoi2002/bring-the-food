import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inputField: {
    height: "40px",
    margin: "25px 0",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px !important",
      margin: "4px 0",
    },

    "& .MuiInputLabel-root": {
      fontSize: "1.25rem !important",
    },

    "& .MuiFormHelperText-root": {
      fontSize: "1.2rem !important",
      maxWidth: "280px",
      lineHeight: "0.6rem !important",
    },
  },
});

function InputField({
  name,
  label,
  placeholder,
  control,
  type,
  register,
  ...inputProps
}) {
  const classes = useStyles();

  const {
    field: { value, ref, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      className={classes.inputField}
      id={name}
      name={name}
      size="medium"
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error ? error.message : ""}
      inputProps={inputProps}
      variant="outlined"
      type={type}
      {...register(`${name}`)}
    />
  );
}

export default InputField;
