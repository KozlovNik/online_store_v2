import React from 'react'

import './slider-img.css';

const SliderImage = ({ ind }) => {
    return (
        <img
            src={`http://localhost:8000/static/store_app/${ind}.jpg`}
            alt=""
            className="slider-image" />
    )
}

export default SliderImage;
