import React from "react";

const Button = ({ text, action }) => {
  return (
    <button className="bg-black px-7 py-4 text-white rounded-xl" value="Search" onClick={action}>
      {text}
    </button>
  );
};

export default Button;
