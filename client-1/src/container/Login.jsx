import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { connect } from "../services/connector";
import { FacebookAuthProvider, signInWithPopup } from "@firebase/auth";
import { authentication } from "../services/firebase-config";
import { Box, Button, OutlinedInput } from "@mui/material";

const Login = () => {
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });

  const loginFunc = async () => {
    connect("auth/login", "POST", JSON.stringify(loginCred));
  };

  const handleGoogleLogin = async (token) => {
    console.log(token.access_token);
    await connect(
      "auth/google",
      "POST",
      JSON.stringify({ token: token.access_token }),
      null
    );
  };

  const handleFacebookLogin = async (user) => {
    let name = user.displayName.split(" ");

    let firstName = name[0];
    let lastName = name[1];

    const userDetails = {
      email: user.email,
      photoURL: user.photoURL,
      firstName,
      lastName,
    };
    await connect("/auth/facebook", "POST", JSON.stringify(userDetails), null);
  };

  const loginFuncGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      //console.log(tokenResponse);
      handleGoogleLogin(tokenResponse);
    },
  });

  const loginFuncFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        handleFacebookLogin(re.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{ display: "flex", height: "90vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "22rem" }}>
        <OutlinedInput
          placeholder="Email"
          type="email"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setLoginCred({ ...loginCred, email: e.target.value })
          }
        />
        <OutlinedInput
          type="password"
          placeholder="Password"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setLoginCred({ ...loginCred, password: e.target.value })
          }
        />
        <Button
          sx={{ margin: "10px 0" }}
          variant="contained"
          onClick={loginFunc}
        >
          Login
        </Button>
        <Button
          sx={{ margin: "10px 0" }}
          variant="contained"
          onClick={loginFuncGoogle}
        >
          Login with Google
        </Button>
        <Button
          sx={{ margin: "10px 0" }}
          variant="contained"
          onClick={loginFuncFacebook}
        >
          Login with Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
