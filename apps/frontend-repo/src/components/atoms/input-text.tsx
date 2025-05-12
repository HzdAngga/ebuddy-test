import { TextField, TextFieldProps } from "@mui/material";

export const InputText: React.FC<TextFieldProps> = ({ ...props }) => {
  return <TextField error={Boolean(props?.["aria-invalid"])} {...props} />;
};
