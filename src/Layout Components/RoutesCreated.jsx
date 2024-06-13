import React, { useContext } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Navbar from "./Navbar";
import { auth } from "../Firebase/firebase";
import { AuthContext } from "../Pages/Context/AuthContext";

const RoutesCreated = () => {
  // const user = auth.currentUser;
  // const other = user?.uid;
  // // console.log("here");
  // console.log(other);
  // console.log(currentUser);
  // const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("UserUID");
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          index
          element={
            <RequireAuth>
              <Navbar />
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesCreated;
