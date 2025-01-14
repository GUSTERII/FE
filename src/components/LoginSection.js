import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/userActions";
import { login } from "../api/AuthenticationApi";
import "../styles/LoginSection.css";

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const tempErrors = {};

    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8 || password.length > 20) {
      tempErrors.password = "Password must be between 8 and 20 characters";
    }

    return tempErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempErrors = validateForm();
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const response = await login(email, password);
        dispatch(loginSuccess(response));
        navigate("/orar");
      } catch (error) {
        console.error("Login failed:", error.message);
        setLoginError(true);
        dispatch(loginFailure("Invalid email or password."));
      }
    }
  };

  return (
    <div className="login-section">
      <Container component="main" maxWidth="xs">
        <Box
          className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-white"
          sx={{
            marginTop: "20px",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Typography component="h1" variant="h5" className="mb-4">
            Logare
          </Typography>
          <form className="w-full" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              className="mb-4"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              className="mb-2"
            />
            <Link
              href=""
              onClick={() => navigate("/forgot-password")}
              className="block text-right text-blue-600 mb-4 pb-1"
              sx={{ cursor: "pointer" }}
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mt-4 mb-4"
            >
              Loghează-te
            </Button>
            {loginError && (
              <Typography color="error" className="text-center">
                Invalid email or password.
              </Typography>
            )}
          </form>
        </Box>
        <div className="login-branding text-center mt-4">
          <Typography variant="h3" component="h1">
            <span>USV</span> Exams
          </Typography>
          <Typography variant="subtitle1">&lt;GUȘTERII&gt;</Typography>
        </div>
      </Container>
    </div>
  );
};

export default LoginSection;
