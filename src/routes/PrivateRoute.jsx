import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../Context/EntireContext";

const PrivateRoute = () => {
  const { userInfo } = useContext(EntireContext);

  return !userInfo ? <Navigate to="/sign-in" replace /> : <Outlet />;
};

export default PrivateRoute;