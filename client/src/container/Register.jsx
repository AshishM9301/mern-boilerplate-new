import React, { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { connect } from "../services/connector";

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

        <Button align="end" title="Register" onClick={registerFunc} />
      </div>
    </div>
  );
};

export default Register;
