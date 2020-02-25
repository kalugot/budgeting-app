import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const header = (props) => {
    return (
        <div className="Header">
          <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light" style={{backgroundColor: 'e3f2fd'}}>
            <a className="navbar-brand" href="#">
              Budgeting App
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home {/*<span className="sr-only">(current)</span>*/}
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
              </ul>
            </div>
          </nav>
        </div>
      );
}

export default header;