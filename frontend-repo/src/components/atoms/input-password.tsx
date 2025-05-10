import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export const InputPassword: React.FC<TextFieldProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      error={Boolean(props?.["aria-invalid"])}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              className='cursor-pointer'
              position='end'
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <VisibilityOutlined className='!text-[#5F737F]' />
              ) : (
                <VisibilityOffOutlined className='!text-[#5F737F]' />
              )}
            </InputAdornment>
          ),
        },
      }}
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
};
