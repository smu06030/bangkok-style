import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../store/Context/EntireContext";

const PublicRoute = () => {
  const { userInfo } = useContext(EntireContext);
  
  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;