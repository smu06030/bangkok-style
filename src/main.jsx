import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserInfoContextProvider from "./Context/UserInfoContextProvider.jsx";
import PostsContextProvider from "./Context/PostsContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <PostsContextProvider>
    <UserInfoContextProvider>
      <App />
    </UserInfoContextProvider>
  </PostsContextProvider>
);
