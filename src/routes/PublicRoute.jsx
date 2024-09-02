import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../Context/EntireContext";
import URLS from "../constant/urls";

const PublicRoute = () => {
  const { userInfo } = useContext(EntireContext);

  return userInfo ? <Navigate to={URLS.home} replace /> : <Outlet />;
};

export default PublicRoute;
