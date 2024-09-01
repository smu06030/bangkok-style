import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../Context/EntireContext";
import URLS from "../constant/urls";

const PrivateRoute = () => {
  const { userInfo } = useContext(EntireContext);

  return !userInfo ? <Navigate to={URLS.signIn} replace /> : <Outlet />;
};

export default PrivateRoute;
