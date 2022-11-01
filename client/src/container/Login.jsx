import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { connect } from "../services/connector";

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

  const loginFuncGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      //console.log(tokenResponse);
      handleGoogleLogin(tokenResponse);
    },
  });

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
      </div>
    </div>
  );
};

export default Login;
