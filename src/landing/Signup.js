import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import send from '../Helpers';
import './landing.css';

/**
 * New User Sign up form component
 *
 * @class SignupForm
 * @extends {Component}
 */
class SignupForm extends Component {
    state = {
      user_details: {
        name: '', username: '', email: '', password: '', confirm_password: '',
      },
      showAlert: false,
      errorMessage: '',
      headerRequired: false,

    }

    /**
     * Update component state based on user input.
     *
     * @memberof SignupForm
     * @param {object} e (user input event)
     */
    handleChange = (e) => {
      const { id, value } = e.target;
      let { user_details } = this.state;
      user_details = Object.assign({}, user_details);
      user_details[id] = value;
      this.setState({ user_details });
    }

    /**
     * Submit new user details to api for user registration.
     *
     * @memberof SignupForm
     * @param {object} e User input event
     */
    handleSubmit = (e) => {
      e.preventDefault();
      const { toggle } = this.props;
      const { user_details, headerRequired } = this.state;
      this.setState({ showAlert: false });
      send(user_details, 'POST', '/api/v1/auth/register', headerRequired)
        .then(response => (response.json()))
        .then((data) => {
          if (data.msg.includes('Successfully')) {
            toggle();
            NotificationManager.success(data.msg, 'signup success:');
          } else {
            this.setState({
              showAlert: true,
              errorMessage: data.msg,
            });
          }
        });
    }

    /**
     * Display new user sign up form.
     *
     * @returns {object} HTML div element
     * @memberof SignupForm
     */
    render() {
      const { showAlert, errorMessage } = this.state;
      return (
        <div className="container signup-container">
          <Alert isOpen={showAlert} color="warning">
            {errorMessage}
          </Alert>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <input
                type="text"
                id="username"
                placeholder="username"
                onChange={this.handleChange}
                required
              />
              <br />
              <input type="text" id="name" placeholder="name" onChange={this.handleChange} required />
              <br />
              <input type="email" id="email" placeholder="email" onChange={this.handleChange} required />
              <br />
              <input type="password" id="password" placeholder="password" onChange={this.handleChange} required />
              <br />
              <input type="password" id="confirm_password" placeholder="confirm password" onChange={this.handleChange} required />
              <br />
            </fieldset>
            <br />
            <button type="submit" className="sign-up-btn">create account</button>
          </form>
        </div>
      );
    }
}

SignupForm.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default SignupForm;
