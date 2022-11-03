import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { Box, Button, OutlinedInput } from "@mui/material";

import { connect } from "../services/connector";
import { authentication } from "../services/firebase-config";

const Register = () => {
  const [registerCred, setRegisterCred] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerFunc = async () => {
    if (registerCred.password === registerCred.confirmPassword) {
      connect("/auth/register", "POST", JSON.stringify(registerCred), null);
    }
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
          type="text"
          placeholder="First Name"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setRegisterCred({ ...registerCred, firstName: e.target.value })
          }
        />
        <OutlinedInput
          type="text"
          placeholder="Last Name"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setRegisterCred({ ...registerCred, lastName: e.target.value })
          }
        />
        <OutlinedInput
          type="email"
          placeholder="Email"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setRegisterCred({ ...registerCred, email: e.target.value })
          }
        />
        <OutlinedInput
          type="password"
          placeholder="Password"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setRegisterCred({ ...registerCred, password: e.target.value })
          }
        />
        <OutlinedInput
          type="password"
          placeholder="Confirm Password"
          sx={{ margin: "10px 0" }}
          onChange={(e) =>
            setRegisterCred({
              ...registerCred,
              confirmPassword: e.target.value,
            })
          }
        />
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={registerFunc}
        >
          Register
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={loginFuncGoogle}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={loginFuncFacebook}
        >
          Login with Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
