/** Edit user Profile form */

import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import send from '../Helpers';

class EditUserForm extends Component {
  state = { edit_details: {} }

  handleSubmit = () => {
    const { edit_details } = this.state;
    send(edit_details, 'POST', '/api/v1/auth/reset-password')
      .then(response => (response.json()))
      .then((data) => {
        if (Object.values(data).includes('Successfully')) {
          console.log(data);
          NotificationManager.success(data.messsage, 'edit profile:');
          this.toggle();
        } else {
          NotificationManager.warning(data.message, 'edit profile:');
        }
      });
  }


  handlechange = (e) => {
    const { id, value } = e.target;
    let { edit_details } = this.state;
    edit_details = Object.assign({}, edit_details);
    if (id === 'old_pass') {
      edit_details.current_password = value;
    } else if (id === 'new_pass') {
      edit_details.new_password = value;
    } else {
      edit_details.confirm_password = value;
    }
    this.setState({ edit_details });
  }

  render() {
    const { name, username, email } = this.props;
    return (
      <form className="edit-user-profile" onSubmit={this.handleSubmit}>
        name:<br />
        <input type="text" value={name} readOnly /><br />
        username:<br />
        <input type="text" value={username} readOnly /><br />
        email:<br />
        <input type="text" value={email} readOnly /><br />
        old password:<br />
        <input type="password" onChange={this.handlechange} id="old_pass" /><br />
        new Password:<br />
        <input type="password" onChange={this.handlechange} id="new_pass" /><br />
        confirm password<br />
        <input type="password" onChange={this.handlechange} id="confirm_pass" /><br />
        <Button type="submit">Edit</Button>

      </form>
    );
  }
}

EditUserForm.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default EditUserForm;
