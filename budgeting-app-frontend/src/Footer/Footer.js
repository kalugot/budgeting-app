import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <nav
        className="navbar fixed-bottom navbar-light bg-light"
        style={{ backgroundColor: "e3f2fd" }}
      >
        <ul className="navbar-nav">
            <li>
                @Copyright 2020 RSK
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
