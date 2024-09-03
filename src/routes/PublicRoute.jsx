import { Navigate, Outlet } from "react-router-dom";
import URLS from "../constant/urls";
import { useCustomSelector } from "../hooks/useSelector";

const PublicRoute = () => {
  const userInfo = useCustomSelector((state) => state.userInfo);

  return userInfo ? <Navigate to={URLS.home} replace /> : <Outlet />;
};

export default PublicRoute;
