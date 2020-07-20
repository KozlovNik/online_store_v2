import React, { Fragment } from 'react';
import Header from '../header';
import ModalLoginWindow from '../modal-login-window'    ;

import './app.css';

const App = () => {
    return (
        <Fragment>
            <ModalLoginWindow />
            <Header />
        </Fragment>
    );
}

export default App