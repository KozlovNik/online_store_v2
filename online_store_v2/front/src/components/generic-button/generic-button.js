import React from "react";

import "./generic-button.css";

const GenericButton = ({ label, handleClick, clsName }) => {
  return (
    <button
      onClick={handleClick}
      className={`generic-button generic-button__${clsName}`}
    >
      {label}
    </button>
  );
};

export default GenericButton;
