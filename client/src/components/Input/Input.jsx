import React, { useState } from "react";

const Input = ({ title, type, placeholder, onChange }) => {
  const checkChange = (e) => {
    onChange(e);
    switch (type) {
      case "email":
        return checkEmail(e);
      case "password":
        return checkPassword(e);
      default:
        break;
    }
  };

  const checkEmail = (e) => {
    let str = e.target.value.split("");
    console.log("checking", str.length > 0 && !str.includes("@"));

    if (str.length > 0 && !str.includes("@")) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const checkPassword = (e) => {
    let str = e.target.value.split("");
    console.log("checking", str.length > 0 && !str.includes("@"));

    if (str.length < 8) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const [error, setError] = useState(false);
  return (
    <>
      {title && <label className="my-3">title</label>}
      <input
        type={type || "text"}
        className={`outline-0 border focus:border focus:border-gray-400 rounded-md px-4 py-2 w-full mt-3 ${
          error ? "border border-red-600" : ""
        } `}
        placeholder={placeholder || "Input"}
        onChange={(e) => checkChange(e)}
      />
    </>
  );
};

export default Input;
