import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getUser } from '../../redux/actions';

import Header from '../header';
import ModalLoginWindow from '../modal-login-window';

import './app.css';

const App = ({ getUser }) => {

    useEffect(() =>{
        getUser()
    },[getUser])

    return (
        <Fragment>
            <ModalLoginWindow />
            <Header />
        </Fragment>
    );
}

export default connect(null, { getUser })(App);