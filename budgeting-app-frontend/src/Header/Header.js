import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const header = props => {
  let show = (props.toggleNavbar) ? "show" : "";
  return (
    <div className="Header">
      <nav
        className="navbar navbar-expand-xl navbar-expand-lg fixed-top navbar-light bg-light"
        style={{ backgroundColor: "e3f2fd" }}
      >
        <Link className="navbar-brand" to={!props.disabled ? "/home" : "/"}>
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

        <div className={"collapse navbar-collapse "+ !show} id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link
                onClick={props.navbarToggleFunction}
                className={"nav-link " + (props.disabled ? "disabled" : null)}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={"nav-link " + (props.disabled ? "disabled" : null)}
                to="/record"
                onClick={props.navbarToggleFunction}
              >
                Record
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={"nav-link " + (props.disabled ? "disabled" : null)}
                to="/transactions"
                onClick={props.navbarToggleFunction}
              >
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={"nav-link " + (!props.disabled ? "disabled" : null)}
                to="/"
                onClick={props.navbarToggleFunction}
              >
                Sign In
              </Link>
            </li>
            <li className="btn mr-auto" style={{padding: "6px 0px", border: "0px"}} onClick={props.navbarToggleFunction}>
              <button
                style={{ border: "0px", paddingLeft: "0px", paddingTop: "2px", backgroundColor: "cadetblue" }}
                onClick={props.logout}
                disabled={props.disabled ? "disabled" : null}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default header;
