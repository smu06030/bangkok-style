import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isSignIn}) => {
  // 로그인이 됐는지 (나중에 전역 상태 관리로 바꿈)
  
  return !isSignIn ? <Navigate to="/sign-in" replace /> : <Outlet />;
};

export default ProtectedRoute;