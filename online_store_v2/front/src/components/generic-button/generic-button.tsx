import React from "react";

import "./generic-button.css";

interface GenericButtonInterface {
  label: string;
  handleClick?: (event: React.MouseEvent) => void;
  clsName: string;
}

const GenericButton: React.FC<GenericButtonInterface> = ({ label, handleClick, clsName }) => {
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
