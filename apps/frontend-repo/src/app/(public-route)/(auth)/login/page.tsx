import { Typography } from "@mui/material";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <>
      <Typography
        className='text-center'
        sx={{ color: "black", fontSize: "1.5rem" }}
      >
        Welcome ^^
      </Typography>
      <Typography
        className='text-center'
        sx={{ color: "black", fontSize: "1rem", mb: 5 }}
      >
        Please enter your credentials
      </Typography>

      <LoginForm />
    </>
  );
}
