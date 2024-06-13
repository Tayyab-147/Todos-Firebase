import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../Context/AuthContext";
import img from "./bg/backimg.jpg";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("cond", userCredential);
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        console.log("user", user);
        localStorage.setItem("UserUID", JSON.stringify(user.uid));
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{ color: "black", marginTop: 1, borderColor: "black" }}
        >
          Register New Account
        </Button>
        {error && (
          <Typography color="error">Wrong email or password!</Typography>
        )}
      </form>
    </Box>
  );
};

export default Login;
