/** Contains signin component */

import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, Button, Alert,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './Signup';
import send from '../Helpers';
import './landing.css';

class SigninForm extends Component {
    state = {
      user_details: { username: '', password: '' },
      show: false,
      showAlert: false,
      errorMsg: '',
    }

    handleChange = (e) => {
      const { id, value } = e.target;
      const { user_details } = this.state;
      const param = id === 'username_login' ? { username: value, password: user_details.password }
        : { password: value, username: user_details.username };
      this.setState({ user_details: param });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      const { user_details, showAlert } = this.state;
      this.setState({ showAlert: false });
      send(user_details, 'POST', '/api/v1/auth/login')
        .then(response => (response.json()))
        .then((data) => {
          if (Object.values(data).toString().includes(user_details.username) && data.access_token) {
            localStorage.setItem('hb_access_token', data.access_token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('hb_user_role', data.role);
            this.setState({ isAuthenticated: true });
            // console.log("SSS", typeof isAdmin)
          } else if (data.msg.includes('Token has expired')) {
            localStorage.removeItem('hb_access_token');
            localStorage.setItem('isAuthenticated', false);
            localStorage.removeItem('hb_user_role');
          } else {
            this.setState({ showAlert: !showAlert, errorMsg: data.msg });
          }
        });
    };

    toggle = () => {
      const { show } = this.state;
      this.setState({ show: !show });
    }

    render() {
      const { location } = this.props;
      const { from } = location || { from: { pathname: '/home' } };
      const {
        isAuthenticated, showAlert, errorMsg, show,
      } = this.state;

      if (isAuthenticated === true) {
        return <Redirect to={from} />;
      }

      return (
        <div className="container login-container">
          <Alert isOpen={showAlert} color="warning">
            {errorMsg}
          </Alert>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>login:</legend>
              <input
                type="text"
                id="username_login"
                placeholder="username"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                type="password"
                id="password_login"
                placeholder="password"
                onChange={this.handleChange}
              />
              <br />
            </fieldset>
            <br />
            <button type="submit" className="sign-in-btn">sign in</button>
          </form>
          <p style={{ margin_top: '15px' }}>
            Don&apost have an account?<Button onClick={this.toggle} className="signup-btn">Sign Up</Button>
          </p>

          <Modal isOpen={show} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>sign up</ModalHeader>
            <ModalBody>
              <SignupForm />
            </ModalBody>
          </Modal>

        </div>
      );
    }
}

SigninForm.propTypes = {
  location: PropTypes.string.isRequired,
};

export default SigninForm;
