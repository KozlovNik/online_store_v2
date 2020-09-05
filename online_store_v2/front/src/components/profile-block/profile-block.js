import React, { useState } from "react";

import "./profile-block.css";

import Auth from "../auth";

const ProfileBlock = () => {
  const [isClose, setIsClose] = useState(true);

  return (
    <div className="profile-block">
      <img
        onClick={() => {
          setIsClose(false);
        }}
        className="profile-block__image"
        src="http://localhost:8000/static/store_app/profile.png"
      />
      <Auth
        isClose={isClose}
        setIsClose={setIsClose}
      />
    </div>
  );
};

export default ProfileBlock;
