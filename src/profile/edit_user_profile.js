/** Edit user Profile form */

import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import send from '../Helpers';

class EditUserForm extends Component {
  state = {
    edit_details: { current_password: null, new_password: null, confirm_password: null },
    showAlert: false,
    errorMsg: null,
  }

  toggle = () => {
    const { showAlert } = this.state;
    this.setState({ showAlert: !showAlert });
  }

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
        name:<br />
        <input type="text" value={name} readOnly /><br />
        username:<br />
        <input type="text" value={username} readOnly /><br />
        email:<br />
        <input type="text" value={email} readOnly /><br />
        old password:<br />
        <input type="password" onChange={this.handlechange} id="current_password" /><br />
        new Password:<br />
        <input type="password" onChange={this.handlechange} id="new_password" /><br />
        confirm password<br />
        <input type="password" onChange={this.handlechange} id="confirm_password" /><br />
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
