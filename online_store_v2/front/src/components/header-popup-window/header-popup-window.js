import React, { useState } from "react";
import classNames from "classnames";

import "./header-popup-window.css";

const HeaderPopupWindow = () => {
  const [hidePopup, setHidePoput] = useState(false);

  return (
    <div
      className={classNames({
        "header-popup-window--hide": hidePopup,
        "header-popup-window":true
      })}
    >
      <div className="header-popup-window__wrapper">
        <p className="header-popup-window__text">Быстрая доставка по Москве.</p>
        <span
          className="header-popup-window__close-button"
          onClick={() => setHidePoput(true)}
        ></span>
      </div>
    </div>
  );
};

export default HeaderPopupWindow;
