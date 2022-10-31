import React, { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { connect } from "../services/connector";

const Login = () => {
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });

  const loginFunc = async () => {
    connect("/auth/login", "POST", JSON.stringify(loginCred));
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
      </div>
    </div>
  );
};

export default Login;
