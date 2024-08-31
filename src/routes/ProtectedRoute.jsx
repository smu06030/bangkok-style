import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../Context/EntireContext";

const ProtectedRoute = () => {
  const { userInfo } = useContext(EntireContext);

  return !userInfo ? <Navigate to="/sign-in" replace /> : <Outlet />;
};

export default ProtectedRoute;