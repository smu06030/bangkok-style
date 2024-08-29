import { BrowserRouter, Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import PublicHome from "../pages/public/Home";
import ProtectedHome from "../pages/protected/Home";
import PublicRoute from "./PublicRoute";
import MyPage from "../pages/protected/MyPage";
import Like from "../pages/public/Like";

const Routes = () => {
  // 로그인이 됐는지 (나중에 전역 상태 관리로 바꿈)
  const isSignIn = true;

  // 모든 사용자 접근 가능
  const publicRoutes = [
    {
      path: "/about",
      element: ""
    }
  ];

  // 권한이 없는 사용자에게 접근 제한
  const unAuthorizedRoutes = [
    {
      path: "/",
      element: <PublicRoute isSignIn={isSignIn} />,
      children: [
        {
          path: "/",
          element: <PublicHome />
        },
        {
          path: "/sign-in",
          element: <SignIn />
        },
        {
          path: "/sign-up",
          element: <SignUp />
        },
        {
          path: "/protected-like",
          element: <Like />
        }
      ]
    }
  ];

  // 권한이 있는 사용자만 접근
  const authorizedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute isSignIn={isSignIn} />,
      children: [
        {
          path: "/",
          element: <ProtectedHome />
        },
        {
          path: "/my-page",
          element: <MyPage />
        },
        {
          path: "/public-like",
          element: <Like />
        }
      ]
    }
  ];

  const notFound = {
    path: "*",
    element: <Navigate to="/" replace />
  };

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!isSignIn ? unAuthorizedRoutes : []),
    ...authorizedRoutes,
    notFound
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
