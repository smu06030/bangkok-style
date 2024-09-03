import { Navigate, Outlet } from "react-router-dom";
import URLS from "../constant/urls";
import { useCustomSelector } from "../hooks/useSelector";

const PrivateRoute = () => {
  const userInfo = useCustomSelector((state) => state.userInfo);

  return !userInfo ? <Navigate to={URLS.signIn} replace /> : <Outlet />;
};

export default PrivateRoute;
