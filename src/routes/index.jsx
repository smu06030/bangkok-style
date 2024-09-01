import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import PublicHome from "../pages/public/Home";
import MyPage from "../pages/protected/MyPage";
import Layout from "../components/Layout/Layout";
import NotPound from "../pages/NotPound";

import Like from "../pages/Like";
import UpLoad from "../pages/protected/UpLoad";
import ModifyUpLoad from "../pages/protected/ModifyUpLoad";

const Routes = () => {
  // 모든 사용자 접근 가능
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <PublicHome />
        },
        {
          path: "/Like",
          element: <Like />
        },
        {
          path: "/modifyUpLoad",
          element: <ModifyUpLoad />
        }
      ]
    }
  ];

  // 권한이 없는 사용자에게 접근 제한
  const unAuthorizedRoutes = [
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/sign-in",
              element: <SignIn />
            },
            {
              path: "/sign-up",
              element: <SignUp />
            }
          ]
        }
      ]
    }
  ];

  // 권한이 있는 사용자만 접근
  const authorizedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/my-page",
              element: <MyPage />
            },
            {
              path: "/upload",
              element: <UpLoad />
            }
          ]
        }
      ]
    }
  ];

  const notFound = {
    path: "*",
    element: <NotPound />
  };

  const router = createBrowserRouter([...routes, ...unAuthorizedRoutes, ...authorizedRoutes, notFound]);

  return <RouterProvider router={router} />;
};

export default Routes;
