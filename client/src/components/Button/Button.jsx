import React from "react";

const Button = ({ title, align, onClick }) => {
  return (
    <div className={`flex justify-${align} mt-4`}>
      <button
        className="border px-6 py-1 rounded-full bg-gray-800 text-gray-200 uppercase"
        onClick={onClick}
      >
        {title || "title"}
      </button>
    </div>
  );
};

export default Button;
