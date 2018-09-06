import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import EditRoleForm from './edit-role-form';
import '../admin.css';


/**
 * Single member row component
 *
 * @class MemberRow
 * @extends {Component}
 */
class MemberRow extends Component {
  state = {
    // tooltipOpen: false,
    show: false,
  }

  /**
   * Change state of edit user role modal
   *
   */
  toggle =() => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const {
      value, username, email, name, acc_status, updateOnEdit,
    } = this.props;
    const { show } = this.state;
    return (
      <tr>
        <td value={value}>{value}</td>
        <td value={username}>{username}</td>
        <td value={email}>{email}</td>
        <td value={name}>{name}</td>
        <td value={acc_status}>{acc_status}</td>
        <td value="edit">
          <Button onClick={this.toggle} className="signup-btn"><i className="fa fa-edit" /></Button>
        </td>

        <Modal isOpen={show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit User Status:</ModalHeader>
          <ModalBody>
            <EditRoleForm user={username} toggle={this.toggle} updateOnEdit={updateOnEdit} />
          </ModalBody>
        </Modal>
      </tr>
    );
  }
}

MemberRow.propTypes = {
  value: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  acc_status: PropTypes.string.isRequired,
  updateOnEdit: PropTypes.func.isRequired,
};

export default MemberRow;
