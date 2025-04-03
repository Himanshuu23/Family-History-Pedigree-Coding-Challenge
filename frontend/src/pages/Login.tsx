import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  Paper,
} from "@mui/material";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const error = err as Error;
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      const error = err as Error;
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f4f4">
      <Paper elevation={3} sx={{ padding: 4, width: 350, bgcolor: "white" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Divider>OR</Divider>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleGoogle}>
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
