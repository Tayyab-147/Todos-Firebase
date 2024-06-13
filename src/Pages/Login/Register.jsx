import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import img from "./bg/backimg.jpg";

const Register = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
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
        Register New Account
      </Typography>
      <form onSubmit={handleRegister}>
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
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{ color: "black", marginTop: 1, borderColor: "black" }}
        >
          Log In instead
        </Button>
        {error && (
          <Typography color="error">
            {password.length < 6
              ? "Password must be 6 characters long"
              : "Email already in use"}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default Register;
