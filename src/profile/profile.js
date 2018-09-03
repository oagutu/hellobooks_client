/** Main user profile module */

import React, { Component } from 'react';
import {
  Button, ModalBody, Modal, ModalHeader,
} from 'reactstrap';
import EditUserForm from './edit_user_profile';
import send from '../Helpers';
import './profile.css';
import monkey from './assets/img/monkey.jpeg';


/** User Profile component */
class Profile extends Component {
  state = {
    user_details: {},
    path: '/api/v1/auth/users/profile?q=',
    show: false,
  }

  componentDidMount = () => {
    const user = localStorage.getItem('user');
    const { path } = this.state;
    send({}, 'GET', path + user)
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ user_details: data.user_data });
      });
  }

  /** Toggle state of edit user profile modal */
  toggle = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { user_details, show } = this.state;
    return (
      <div className="container body-sec">
        <h4>User Profile</h4>
        <div className="container user-profile">
          <div className="profile-one">
            <img
              src={monkey}
              className="user-prof-pic"
              alt="user profile"
            />
          </div>
          <div className="container prof-details">
            <Button onClick={this.toggle}>Edit Profile</Button><br />
            <div>
              <span>name:</span><br />
              {user_details.name}
            </div>
            <div>
              <span>username:</span><br />
              {user_details.username}
            </div>
            <div>
              <span>email:</span><br />
              {user_details.email}
            </div>
            <div>
              <span>account Status/Type:</span><br />
              {user_details.acc_status}
            </div>
          </div>
        </div>
        <Modal isOpen={show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit profile: </ModalHeader>
          <ModalBody>
            <EditUserForm
              name={user_details.name}
              username={user_details.username}
              email={user_details.email}
              toggleEditModal={this.toggle}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Profile;
