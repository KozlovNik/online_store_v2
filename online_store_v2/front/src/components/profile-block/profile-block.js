import React, { useState } from "react";

import "./profile-block.css";

import Auth from "../auth";

const ProfileBlock = () => {
  const [isClose, setIsClose] = useState(true);

  return (
    <div className="profile-block">
      <svg
      className="profile-block__image"
      onClick={() => {
        setIsClose(false);
      }}
        width="27"
        height="31"
        viewBox="0 0 27 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 15C17.6421 15 21 11.6421 21 7.5C21 3.35786 17.6421 0 13.5 0C9.35786 0 6 3.35786 6 7.5C6 11.6421 9.35786 15 13.5 15ZM13.5 13C16.5376 13 19 10.5376 19 7.5C19 4.46243 16.5376 2 13.5 2C10.4624 2 8 4.46243 8 7.5C8 10.5376 10.4624 13 13.5 13Z"
          fill="#51534C"
        />
        <path
          d="M1 30C1 30 3.44827 15 13.5 15C23.5517 15 26 30 26 30"
          stroke="#51534C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.8435 10.0997C16.0821 9.8845 16.4685 9.88628 16.66 10.1444V10.1444C16.7955 10.327 16.7873 10.5815 16.6236 10.7394C15.8143 11.5199 14.7133 12 13.5001 12C12.2808 12 11.1748 11.5151 10.3644 10.7276C10.2018 10.5696 10.1942 10.3161 10.3292 10.1341V10.1341C10.5211 9.87539 10.9087 9.8744 11.147 10.091C11.7686 10.6558 12.5941 11 13.5001 11C14.4014 11 15.2231 10.6593 15.8435 10.0997Z"
          fill="#51534C"
        />
      </svg>
      <Auth isClose={isClose} setIsClose={setIsClose} />
    </div>
  );
};

export default ProfileBlock;
