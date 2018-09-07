/** Contains signin component */

import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, Button, Alert,
} from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './Signup';
import send from '../Helpers';
import './landing.css';
import 'react-notifications/lib/notifications.css';

/**
 * Registered user sign in component.
 *
 * @class SigninForm
 * @extends {Component}
 */
class SigninForm extends Component {
    state = {
      user_details: { username: '', password: '' },
      show: false,
      showAlert: false,
      errorMsg: '',
    }

    /**
     * Update component state based on user input.
     *
     * @memberof SigninForm
     * @param {object} e (user input event)
     */
    handleChange = (e) => {
      const { id, value } = e.target;
      const { user_details } = this.state;
      const param = id === 'username_login' ? { username: value, password: user_details.password }
        : { password: value, username: user_details.username };
      this.setState({ user_details: param });
    };

    /**
     * Submit registered user details to api for user login.
     *
     * @memberof SigninForm
     * @param {object} e User input event
     */
    handleSubmit = (e) => {
      e.preventDefault();
      const { user_details } = this.state;
      const { history } = this.props;
      this.setState({ showAlert: false });
      send(user_details, 'POST', '/api/v1/auth/login')
        .then(response => (response.json()))
        .then((data) => {
          if (Object.values(data).toString().includes(user_details.username) && data.access_token) {
            localStorage.setItem('hb_access_token', data.access_token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('hb_user_role', data.role);
            localStorage.setItem('user', data.user);
            history.push({ pathname: '/home' });
            NotificationManager.success(data.msg, 'login success:');
          } else if (data.msg.includes('Token has expired')) {
            localStorage.clear();
          } else {
            this.setState({ showAlert: true, errorMsg: data.msg });
          }
        });
    };

    /**
     * Toggle the state/vivsibility of the signup form modal.
     *
     * @memberof SigninForm
     */
    toggle = () => {
      const { show } = this.state;
      this.setState({ show: !show });
    }

    /**
     * Display they signin form
     *
     * @returns {object} HTML div element
     * @memberof SigninForm
     */
    render() {
      const {
        showAlert, errorMsg, show,
      } = this.state;

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
            Don&apos;t have an account?<Button onClick={this.toggle} className="signup-btn">Sign Up</Button>
          </p>

          <Modal isOpen={show} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>sign up</ModalHeader>
            <ModalBody>
              <SignupForm toggle={this.toggle} />
            </ModalBody>
          </Modal>

        </div>
      );
    }
}

SigninForm.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(SigninForm);
