import React, { forwardRef } from "react";

import "./label-block.css";

interface LabelBlockInterface {
  label: string;
  handleClick: () => void;
}

const LabelBlock = forwardRef((props: LabelBlockInterface, ref: any) => {
  const { label, handleClick } = props;
  return (
    <div className="label-block" ref={ref}>
      <p className="label-block__label">{label}</p>
      <span className="label-block__close-btn" onClick={handleClick}></span>
    </div>
  );
});

export default LabelBlock;
