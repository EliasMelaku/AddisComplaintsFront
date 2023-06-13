import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/check")
      .then((res) => {
        setUser(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        setLoadingUser(false);
        setUser(null);
      });
  }, []);

  return (
    <LoginContext.Provider value={[user, setUser]}>
      {!loadingUser && props.children}
    </LoginContext.Provider>
  );
};
