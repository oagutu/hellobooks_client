/** Main user profile module */

import React, { Component } from 'react';
import {
  Button, ModalBody, Modal, ModalHeader,
} from 'reactstrap';
import EditUserForm from './edit_user_profile';
import send from '../Helpers';
import './profile.css';
import bear from './assets/img/bear.jpeg';
import antelope from './assets/img/antelope.jpeg';
import ibis from './assets/img/ibis.jpeg';
import shark from './assets/img/shark.jpeg';
import owl from './assets/img/owl.jpg';
import tiger from './assets/img/tiger.jpeg';


/** User Profile component */
class Profile extends Component {
  state = {
    user_details: {},
    path: '/api/v1/auth/users/profile?q=',
    show: false,
    image: antelope,
  }

  /**
   * Fetch user info to be displayed on component render
   *
   * @memberof Profile
   */
  componentDidMount = () => {
    // Select random image from list to be used as profile pic.
    const prof_image_list = [bear, antelope, ibis, shark, owl, tiger];
    const image = prof_image_list[Math.floor(Math.random() * (6 - 0) + 0)];

    const user = localStorage.getItem('user');
    const { path } = this.state;
    send({}, 'GET', path + user)
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ user_details: data.user_data, image });
      });
  }

  /**
   * Toggle state of edit user profile modal
   *
   * @memberof Profile
   */
  toggle = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  /**
   * Display logged in user's profile
   *
   * @memberof Profile
   */
  render() {
    const { user_details, show, image } = this.state;
    return (
      <div className="container body-sec">
        <div className="card testimonial-card body-sec">
          <div className="card-header"><h4>{user_details.name}</h4></div>

          <div className="card-up" />

          {/* <!-- Avatar --> */}
          <div className="avatar mx-auto white">
            <img src={image} className="rounded-circle" alt="alt" />
          </div>

          <div className="card-body">
            {/*  Username */}
            <h3 className="card-title username"><i className="fa fa-user-o" /> {user_details.username}</h3>
            <div><i className="fa fa-envelope-o" /> {user_details.email}</div>
            <div className="acc_status">{user_details.acc_status}</div>
            <hr />
          </div>
          <Button className="change-password" onClick={this.toggle}><i className="fa fa-edit" /> change password</Button>
        </div>

        {/* Change password modal */}
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
