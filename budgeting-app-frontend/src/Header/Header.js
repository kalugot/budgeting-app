import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const header = props => {
  return (
    <div className="Header">
      <nav
        className="navbar navbar-expand-xl navbar-expand-lg fixed-top navbar-light bg-light"
        style={{ backgroundColor: "e3f2fd" }}
      >
        <Link className="navbar-brand" to="/home">
          Budgeting App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/record">
                Record
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transactions">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
            </li>
              <button style={{ border: "0px", backgroundColor: "cadetblue" }} onClick={props.logout}>
                Logout
              </button>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default header;
