import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../Pages/Context/AuthContext";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // console.log("rin");
    // console.log(dispatch);
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{ marginLeft: "auto", marginRight: { xs: 0, md: 4 } }}
        >
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default Navbar;
