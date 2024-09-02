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
import URLS from "../constant/urls";
import Detail from "../pages/public/Detail";

const Routes = () => {
  // 모든 사용자 접근 가능
  const routes = [
    {
      path: URLS.home,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <PublicHome />
        },
        {
          path: URLS.like,
          element: <Like />
        },
        {
          path: URLS.detail,
          element: <Detail />
        }
      ]
    }
  ];

  // 권한이 없는 사용자에게 접근 제한
  const unAuthorizedRoutes = [
    {
      path: URLS.home,
      element: <PublicRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: URLS.signIn,
              element: <SignIn />
            },
            {
              path: URLS.signUp,
              element: <SignUp />
            },
            {
              path: URLS.passwordRecovery,
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
      path: URLS.home,
      element: <PrivateRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: URLS.myPage,
              element: <MyPage />
            }
          ]
        }
      ]
    }
  ];

  const notFound = {
    path: URLS.others,
    element: <NotPound />
  };

  const router = createBrowserRouter([...routes, ...unAuthorizedRoutes, ...authorizedRoutes, notFound]);

  return <RouterProvider router={router} />;
};

export default Routes;
