import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import send from '../Helpers';
import './home.css';

const BaseTemplate () => {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top">
          <a className="navbar-brand brand-main" href="library.html">
              hello
            <b style={{ color: 'white' }}>
               books
            </b>
          </a>
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="dropdown">
                <a className="droplink">
                    Dropdown
                  <i className="fa fa-caret-down" />
                </a>
                <div className="dropdown-content">
                  <li className="nav-item">
                    <a className="nav-link" href="updateinfo.html" data-toggle="tooltip" title="add or edit book">
                      <i className="fa fa-plus" />
                       update book
                    </a>
                  </li>
                  {/* visible for purposes of demonstration
                   will only be seen by admins whne in production */}
                  <li className="nav-item">
                    <a className="nav-link" href="#" style={{ font_size: '12px' }}>
                      <i className="fa fa-power-off" />
                      logout
                    </a>
                  </li>
                  <a href="#">
                      Link 1
                  </a>
                  <a href="#">
                    Link 2
                  </a>
                  <li className="nav-item">
                    <a href="library.html">
                      <i className="fa fa-book" />
                      <b className="nav-term">
                        library
                      </b>
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a href="">
                      <i className="fa fa-user-circle-o" />
                      <b className="nav-term">
                        profile
                      </b>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="history.html">
                      <i className="fa fa-history" />
                      <b className="nav-term">
                        history
                      </b>
                    </a>
                  </li>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default BaseTemplate;
