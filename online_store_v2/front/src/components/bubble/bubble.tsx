import React from "react";

import "./bubble.css";

interface BubbleInterface {
  id: number;
  callback: (id: number) => void;
}

const Bubble: React.FC<BubbleInterface> = ({ id, callback }) => {
  return (
    <div
      className="bubble"
      onClick={() => {
        callback(id);
      }}
    ></div>
  );
};

export default Bubble;
