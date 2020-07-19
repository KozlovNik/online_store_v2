import React, { useState } from 'react';

import './header-popup-window.css';

const HeaderPopupWindow = () => {

    const [popup, setPopup] = useState(true);

    return (
        <div className="header-popup-window">
            {
                popup &&
                <div className="header-popup-window__wrapper">
                    <p className="header-popup-window__text">Быстрая доставка по Москве.</p>
                    <span
                        className="header-popup-window__close-button"
                        onClick={() => setPopup(false)}>
                    </span>
                </div >
            }
        </div>
    )
}

export default HeaderPopupWindow;