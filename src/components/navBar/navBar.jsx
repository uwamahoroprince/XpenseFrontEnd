import React from "react";
import "./navBar.css";
import imgLogo from "../../image/logo.png";
const NavBar = () => {
  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={imgLogo} />
        </div>
        <div className="profile"></div>
      </div>
    </>
  );
};
export default NavBar;
