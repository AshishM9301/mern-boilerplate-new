import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import App from "./App";

import "./index.css";

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
