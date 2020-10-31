import React from "react";

import "./slider-img.css";

interface Props {
  ind: number;
}

const SliderImage = ({ ind }: Props) => {
  return (
    <img
      src={`http://localhost:8000/static/store_app/${ind}.jpg`}
      alt=""
      className="slider-image"
    />
  );
};

export default SliderImage;
