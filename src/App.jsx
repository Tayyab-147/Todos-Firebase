import React from "react";
import RoutesCreated from "./Layout Components/RoutesCreated";
import { AuthContextProvider } from "./Pages/Context/AuthContext";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <RoutesCreated />
      </AuthContextProvider>
    </>
  );
};

export default App;
