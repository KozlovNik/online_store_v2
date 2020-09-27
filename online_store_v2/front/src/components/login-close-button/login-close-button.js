import React from 'react';
import { connect } from 'react-redux';

import { setModalWindow } from '../../redux/actions';

import './login-close-button.css';

const LoginCLoseButton = ({ setModalWindow }) => {
    return (
        <div
            className="flag"
            onClick={() => setModalWindow(false)}>
            <div className="popup-login-window__close-button">
            </div>
        </div>
    )
}

export default connect(null, { setModalWindow })(LoginCLoseButton);
