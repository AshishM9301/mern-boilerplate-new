import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { connect } from "../services/connector";
import { authentication } from "../services/firebase-config";
import { async } from "@firebase/util";

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
      connect("/auth/register", "POST", JSON.stringify(registerCred));
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
    <div className="h-11/12 flex justify-center items-center">
      <div className="w-96 mx-auto">
        <Input
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setRegisterCred({ ...registerCred, firstName: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setRegisterCred({ ...registerCred, lastName: e.target.value })
          }
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setRegisterCred({ ...registerCred, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setRegisterCred({ ...registerCred, password: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setRegisterCred({
              ...registerCred,
              confirmPassword: e.target.value,
            })
          }
        />
        <Button align="end" title="Register" onClick={registerFunc} />{" "}
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

export default Register;
