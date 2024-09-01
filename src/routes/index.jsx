import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import PublicHome from "../pages/public/Home";
import Layout from "../components/Layout/Layout";
import NotPound from "../pages/NotPound";
import Like from "../pages/Like";
import PasswordRecovery from "../pages/public/PasswordRecovery";
import PrivateRoute from "./PrivateRoute";
import MyPage from "../pages/private/MyPage";

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
          path: "/detail",
          element: <Detail />
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
            },
            {
              path: "/password-recovery",
              element: <PasswordRecovery />
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
      element: <PrivateRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/my-page",
              element: <MyPage />
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
