import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { connect } from "../services/connector";
import { FacebookAuthProvider, signInWithPopup } from "@firebase/auth";
import { authentication } from "../services/firebase-config";

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
    <div className="h-11/12 flex justify-center items-center">
      <div className="w-96 mx-auto">
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setLoginCred({ ...loginCred, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginCred({ ...loginCred, password: e.target.value })
          }
        />
        <Button align="end" title="Login" onClick={loginFunc} />
        <Button
          align="end"
          title="Login with Google"
          onClick={loginFuncGoogle}
        />
        <Button
          align="end"
          title="Login with Facebook"
          onClick={loginFuncFacebook}
        />
      </div>
    </div>
  );
};

export default Login;
