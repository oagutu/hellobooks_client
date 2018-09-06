/** Edit user role/status form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import send from '../../Helpers';
import '../admin.css';

class EditRoleForm extends Component {
  state = {
    user_details: { new_status: 'member', user: '' },
  }

  componentDidMount = () => {
    const { user } = this.props;
    const { user_details } = this.state;
    user_details.user = user;
    this.setState({ user_details });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_details } = this.state;
    const { toggle, updateOnEdit } = this.props;
    // console.log(this.state)
    send(user_details, 'POST', '/api/v1/auth/users/status_change')
      .then(response => (response.json()))
      .then((data) => {
        toggle();
        updateOnEdit(user_details);
        NotificationManager.success(data.msg, 'Change user status:');
      });
  }

    handleChange = (e) => {
      let { user_details } = this.state;
      user_details = Object.assign({}, user_details);
      user_details.new_status = e.target.value;
      this.setState({ user_details });
      // console.log(this.state)
    }

    render() {
      return (

        <form className="container edit-role-form" onSubmit={this.handleSubmit}>
          <select id="user-role" onChange={this.handleChange}>
            <option value="select_role" disabled>Select role</option>
            <option value="admin">admin</option>
            <option value="member" selected>member</option>
            <option value="suspended">suspended</option>
            <option value="banned">banned</option>
          </select>
          <input type="submit" className="edit-role-btn" />
        </form>
      );
    }
}

EditRoleForm.propTypes = {
  user: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  updateOnEdit: PropTypes.func.isRequired,
};

export default EditRoleForm;
