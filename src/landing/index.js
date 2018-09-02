import React from 'react';
import SigninForm from './signin';
import './landing.css';

/** Main landing page component */
const App = () => (
  <div className="Landing">
    <div className="container login-main">
      <div className="row login-row">
        <div className="col-md-7 login-left signin-left">
          <div className="container login-pg-text">
            <h1>Your Library Solution</h1>
            <p className="login-pg-msg">We have thousands of books...
              <br />plus whichever one you you just so happen to need...
            </p>
          </div>
        </div>
        <div className="col-md-5 login-right signin-right">
          <SigninForm />
        </div>
      </div>
    </div>
  </div>
);

export default App;

// TODO: Move navbar into login-main container so landing page only occupies window ie. no scrolling
