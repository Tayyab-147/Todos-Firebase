import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import { auth } from "../../Firebase/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(AuthReducer, {
    currentUser: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      state.currentUser = user;
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
