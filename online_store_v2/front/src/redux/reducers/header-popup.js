import { SET_HEADER_POPUP_FALSE } from "../action-types";

const headerPopup = (state = true, action) => {
  switch (action.type) {
    case SET_HEADER_POPUP_FALSE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default headerPopup;
