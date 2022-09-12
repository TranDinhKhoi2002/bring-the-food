import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

function InputField({
  name,
  label,
  placeholder,
  control,
  type,
  ...inputProps
}) {
  const {
    field: { value, ref, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      className="wrapper"
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
    />
  );
}

export default InputField;
