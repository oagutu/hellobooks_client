/** Parent member component */

import React, { Component } from 'react';
import send from '../../Helpers';
import MemberTable from './member-table';
import '../admin.css';


class MemberMain extends Component {
  state = { members: [] }

  componentDidMount = () => {
    send({}, 'GET', '/api/v1/auth/users')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ members: data });
      //   console.log(this.state)
      });
  }

  updateOnEdit = (user) => {
    const { members } = this.state;
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
        <MemberTable members={members} updateOnEdit={this.updateOnEdit} />
      </div>
    );
  }
}

export default MemberMain;
