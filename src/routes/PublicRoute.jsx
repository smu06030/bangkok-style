import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../store/Context/EntireContext";

const PublicRoute = () => {
  const { isSignIn } = useContext(EntireContext);
  
  return isSignIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;