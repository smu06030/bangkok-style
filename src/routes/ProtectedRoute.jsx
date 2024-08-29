import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EntireContext from "../store/Context/EntireContext";

const ProtectedRoute = () => {
  const { isSignIn } = useContext(EntireContext);

  return !isSignIn ? <Navigate to="/sign-in" replace /> : <Outlet />;
};

export default ProtectedRoute;