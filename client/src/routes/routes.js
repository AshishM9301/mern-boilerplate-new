import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../container/Login";
import Register from "../container/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //loader:,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
