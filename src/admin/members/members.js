/** Parent member component */

import React, { Component } from 'react';
import send from '../../Helpers';
import MemberTable from './member-table';
import '../admin.css';


export const fetchData = () => send({}, 'GET', '/api/v1/auth/users');

/**
 * Main member component
 *
 * @class MemberMain
 * @extends {Component}
 */
class MemberMain extends Component {
  state = { members: [] }

  /**
   * Fetch all users on component loading
   *
   * @memberof MemberMain
   */
  componentDidMount = () => {
    fetchData()
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ members: data });
        console.log(typeof data);
      });
  }

  /**
   * Update stae to reflect change in a user's role
   *
   * @param {*} user
   */
  updateOnEdit = (user) => {
    const { members } = this.state;
    // Get affected entry in the this.state.members and update it accordingly before updating state
    const edited_user = members.filter(detail => detail.username === user.user)[0];
    const index_edited = members.indexOf(edited_user);
    const updated_user = Object.assign({}, edited_user, { acc_status: user.new_status });
    members[index_edited] = updated_user;
    this.setState({ members });
  }

  render() {
    const { members } = this.state;
    return (
      <div className="container">
        {/* Call member table component */}
        <MemberTable members={members} updateOnEdit={this.updateOnEdit} />
      </div>
    );
  }
}

export default MemberMain;
