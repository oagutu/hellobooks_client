/** Edit user Profile form */

import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import send from '../Helpers';

/**
 * Edit user profile/change password form componet
 *
 * @class EditUserForm
 * @extends {Component}
 */
class EditUserForm extends Component {
  state = {
    edit_details: { current_password: null, new_password: null, confirm_password: null },
    showAlert: false,
    errorMsg: null,
  }

  /**
   * Handle changing state of alert for errors when changing password
   */
  toggle = () => {
    const { showAlert } = this.state;
    this.setState({ showAlert: !showAlert });
  }

  /**
   * Submit change password details to api endpoint and receive response
   *
   * @param {*} e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { toggleEditModal } = this.props;
    const { edit_details } = this.state;
    send(edit_details, 'POST', '/api/v1/auth/reset-password')
      .then(response => (response.json()))
      .then((data) => {
        if (Object.values(data).includes('Successfully changed password')) {
          NotificationManager.success(data.message, 'edit profile:');
          toggleEditModal();
        } else {
          this.setState({ showAlert: true, errorMsg: data.message });
        }
      });
  }


  /**
   * Handle user input changes on the edit user profile form
   *
   * @param {*} e
   */
  handlechange = (e) => {
    const { id, value } = e.target;
    let { edit_details } = this.state;
    edit_details = Object.assign({}, edit_details);
    edit_details[id] = value;
    this.setState({ edit_details });
  }

  render() {
    const { name, username, email } = this.props;
    const { showAlert, errorMsg } = this.state;
    return (
      <form className="edit-user-profile" onSubmit={this.handleSubmit}>
        <Alert isOpen={showAlert} color="warning">
          {errorMsg}
        </Alert>
        <span>name:</span><br />
        <input type="text" value={name} readOnly /><br />
        <span>username:</span><br />
        <input type="text" value={username} readOnly /><br />
        <span>email:</span><br />
        <input type="text" value={email} readOnly /><br />
        <span><span className="required">*</span>old password:</span><br />
        <input type="password" onChange={this.handlechange} id="current_password" required /><br />
        <span><span className="required">*</span>new Password:</span><br />
        <input type="password" onChange={this.handlechange} id="new_password" required /><br />
        <span><span className="required">*</span>confirm password:</span><br />
        <input type="password" onChange={this.handlechange} id="confirm_password" required /><br />
        <Button type="submit">Edit</Button>

      </form>
    );
  }
}

EditUserForm.defaultProps = {
  name: null,
  username: null,
  email: null,
};

EditUserForm.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  toggleEditModal: PropTypes.func.isRequired,
};

export default EditUserForm;
