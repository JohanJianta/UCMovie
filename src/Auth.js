import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { host } from "./services/generateCard";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const login = useCallback((response) => {
    setCurrentUser(response);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      isTokenValidated,
      login,
    }),
    [currentUser, isTokenValidated, login]
  );

  // Cek apakah client sudah login apabila halaman terefresh
  useEffect(() => {
    fetch(`${host}protected`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      withCredentials: true,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((json) => {
        setCurrentUser(json.userId);
      })
      .catch((err) => {
        setCurrentUser(null);
        // console.log(err);
      })
      .then(() => setIsTokenValidated(true));
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
