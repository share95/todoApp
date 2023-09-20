import React from "react";
import axios from "axios";
import {
  FormControl,
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Link,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Lock from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigation = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitLogin = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    axios
      .post("/users/login", {
        username: formData.get("username"),
        password: formData.get("password"),
      })
      .then((response) => {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigation('/tasks');
      })
      .catch((error) => {
        alert(error.response.data.title + ": " + error.response.data.message);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper sx={{ my: 4, p: 2 }} elevation={3}>
        <Typography variant="h4" mb={2}>
          Login{" "}
        </Typography>
        <Box component="form" onSubmit={submitLogin} name="loginForm">
          <div>
            <FormControl fullWidth>
              <TextField
              
                label="Username"
                variant="outlined"
                id="username"
                name="username"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                
                label="Password"
                variant="outlined"
                id="password"
                name="password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div>
            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
              Login
            </Button>
            <Button  variant="text" sx={{ mt: 4 , float:"right"}}>
             <Link href="/register">Register</Link>
            </Button>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
