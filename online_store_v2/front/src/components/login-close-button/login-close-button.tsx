import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { setModalWindow } from "../../store/auth/actions";

import "./login-close-button.css";

const connector = connect(null, { setModalWindow });

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginCLoseButton = ({ setModalWindow }: PropsFromRedux) => {
  return (
    <div className="flag" onClick={() => setModalWindow(false)}>
      <div className="popup-login-window__close-button"></div>
    </div>
  );
};

export default connector(LoginCLoseButton);
