import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { setModalWindow } from "../../store/auth/actions";
import { SET_LOGIN_MODAL_WINDOW } from "../../store/auth/types";

import "./login-close-button.css";

const mapDispatch = {
  setModalWindow: (data:boolean) => SET_LOGIN_MODAL_WINDOW,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginCLoseButton = ({ setModalWindow }: PropsFromRedux) => {
  return (
    <div className="flag" onClick={() => setModalWindow(false)}>
      <div className="popup-login-window__close-button"></div>
    </div>
  );
};

export default connector(LoginCLoseButton);
