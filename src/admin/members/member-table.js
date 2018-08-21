import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import MemberRow from './member-row';
import '../admin.css';

const MemberTable = (props) => {
  const { members } = props;

  return (
    <div className="container body-sec">
      <Table className="members-table">
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            <th>name</th>
            <th>acc_status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <MemberRow
              key={m.user_id}
              value={m.user_id}
              username={m.username}
              name={m.name}
              email={m.email}
              acc_status={m.acc_status}
            />))}
        </tbody>
      </Table>
    </div>
  );
};

MemberTable.propTypes = {
  members: PropTypes.shape().isRequired,
};

export default MemberTable;
