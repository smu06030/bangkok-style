import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import PublicHome from "../pages/public/Home";
import MyPage from "../pages/protected/MyPage";
import Layout from "../components/Layout/Layout";
import NotPound from "../pages/NotPound";
<<<<<<< HEAD
import Like from "../pages/Like";
import { useContext } from "react";
import EntireContext from "../store/Context/EntireContext";
=======
>>>>>>> 72d3ac27ac17ae0d1bf679a86f799a197fd8591c

const Routes = () => {
  // 로그인이 됐는지
  const isSignIn = window.localStorage.getItem("signIn");

  // 모든 사용자 접근 가능
  const routes = [
    {
      path: "/",
      element: <Layout isSignIn={isSignIn} />,
      children: [
        {
          index: true,
          element: <PublicHome />
        },
        {
          path: "/Like",
          element: <Like />
        }
      ]
    }
  ];

  // 권한이 없는 사용자에게 접근 제한
  const unAuthorizedRoutes = [
    {
      path: "/",
      element: <PublicRoute isSignIn={isSignIn} />,
      children: [
        {
          element: <Layout isSignIn={isSignIn} />,
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
      element: <ProtectedRoute isSignIn={isSignIn} />,
      children: [
        {
          element: <Layout isSignIn={isSignIn} />,
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
