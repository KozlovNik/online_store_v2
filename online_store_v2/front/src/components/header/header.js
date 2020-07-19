import React from 'react';
import './header.css';
import HeaderPopupWindow from '../header-popup-window';
import HeaderMainPart from '../header-main-part';


const Header = () => {
    return (
        <header>
            <HeaderPopupWindow />
            <HeaderMainPart/>
        </header>
    );
}

export default Header