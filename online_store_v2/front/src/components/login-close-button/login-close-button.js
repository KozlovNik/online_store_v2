import React from 'react';

import { connect } from 'react-redux';
import { setLoginModalWindow } from '../../redux/actions';

import './login-close-button.css';

const LoginCLoseButton = ({ setLoginModalWindow }) => {
    return (
        <div
            className="flag"
            onClick={() => setLoginModalWindow(false)}>
            <div className="popup-login-window__close-button">
            </div>
        </div>
    )
}

export default connect(null, { setLoginModalWindow })(LoginCLoseButton);
