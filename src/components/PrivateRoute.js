import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth";

export default function PrivateRoute() {
  const { currentUser, isTokenValidated } = useContext(AuthContext);

  if (!isTokenValidated) return <div />;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
