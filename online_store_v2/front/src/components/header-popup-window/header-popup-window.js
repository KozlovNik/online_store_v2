import React from 'react';

import { connect } from 'react-redux';
import { setHeaderPopupFalse } from '../../redux/actions';

import './header-popup-window.css';

const HeaderPopupWindow = ({ setHeaderPopupFalse, headerPopup }) => {
    let display;
    if (headerPopup) {
        display = (
            <div className="header-popup-window__wrapper">
                <p className="header-popup-window__text">Быстрая доставка по Москве.</p>
                <span
                    className="header-popup-window__close-button"
                    onClick={() => setHeaderPopupFalse()}></span>
            </div >
        )
    } else {
        display = <div className="header-popup-window__empty-block"></div>;
    }

    return <div className="header-popup-window">{display}</div>;
}

function mapStateToProps({ headerPopup }) {
    return { headerPopup }
}

export default connect(mapStateToProps, { setHeaderPopupFalse })(HeaderPopupWindow);