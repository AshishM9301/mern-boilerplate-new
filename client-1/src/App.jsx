import React from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <>
      <GoogleOAuthProvider
        clientId={`996058088574-ri1hm1te6ii4p41h1avmvb1f46g57qh9.apps.googleusercontent.com`}
      >
        <Navbar />
        <Outlet />
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
