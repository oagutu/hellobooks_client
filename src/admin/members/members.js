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

  render() {
    const { members } = this.state;
    return (
      <div className="container">
        <MemberTable members={members} />
      </div>
    );
  }
}

export default MemberMain;
