import React, { useState, useEffect } from 'react';

import SliderImage from '../slider-img';
import Bubble from '../bubble';

import './slider-page.css';

const sliderArr = [1, 2, 3];

const SliderPage = () => {

    const [x, setX] = useState(0);

    const goRight = () => {
        setX(x => x === -100 * (sliderArr.length - 1) ? 0 : x - 100);
    }

    const goLeft = () => {
        setX(x => x === 0 ? -100 * (sliderArr.length - 1) : x + 100);
    }

    const [intervalId, setIntervalId] = useState(() => goRight);

    useEffect(() => {
        const id = setInterval(intervalId, 3000);
        return () => clearInterval(id);
    }, [intervalId])

    const handleLeftButtonClick = () => {
        goLeft();
        setIntervalId(() => goRight);
    }

    const handleRightButtonClickht = () => {
        goRight()
        setIntervalId(() => goRight)
    }

    const callback = (ind) => {
        setX((ind - 1) * -100)
        setIntervalId(() => goRight);
    }

    return (
        <div className="slider" >
            {sliderArr.map((id,ind) => {
                return (
                    <div key={id} className="slide" style={{ transform: `translateX(${x}%)` }}>
                        {<SliderImage ind={ind+1} />}
                    </div>
                )
            })}
            <button
                className="slider__button slider__button--left"
                onClick={handleLeftButtonClick}>
                <i className="fa fa-chevron-left arrow" aria-hidden="true"></i>
            </button>
            <button
                className="slider__button slider__button--right"
                onClick={handleRightButtonClickht}>
                <i className="fa fa-chevron-right arrow" aria-hidden="true"></i>
            </button>
            <div className="bubbles">
                {sliderArr.map((id, ind) => <Bubble key={id} id={ind + 1} callback={callback} />)}
            </div>
        </div >
    )
}

export default SliderPage;