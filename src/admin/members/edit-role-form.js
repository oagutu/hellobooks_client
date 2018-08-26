/** Edit user role/status form */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import send from '../../Helpers';
import '../admin.css';

class EditRoleForm extends Component {
  state = {
    user_details: { new_status: '', user: '' },
    showAlert: false,
    errorMessage: '',
  }

  componentDidMount = () => {
    const { user } = this.props;
    const { user_details } = this.state;
    user_details.user = user;
    this.setState({ user_details });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_details, showAlert } = this.state;
    // console.log(this.state)
    send(user_details, 'POST', '/api/v1/auth/users/status_change')
      .then(response => (response.json()))
      .then((data) => {
      // console.log(data);
        this.setState({
          showAlert: !showAlert,
          errorMessage: data.msg,
        });
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
      // console.log(this.props)
      const { showAlert, errorMessage } = this.state;
      return (

        <form className="container edit-role-form" onSubmit={this.handleSubmit}>
          <Alert isOpen={showAlert} color="warning">
            {errorMessage}
          </Alert>

          <select id="user-role" onChange={this.handleChange}>
            <option value="select_role" disabled>Select role</option>
            <option value="admin">admin</option>
            <option value="member">member</option>
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
};

export default EditRoleForm;
