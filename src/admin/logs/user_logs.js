import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import LogRow from './log_row';

/**
 * User action log table
 *
 * @class UserLogTable
 * @extends {Component}
 */
class UserLogTable extends Component {
  state = {
    isResultLimited: false,
  }

  render() {
    const { details } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>timestamp</th>
            <th>user_id</th>
            <th>action</th>
            <th>success</th>
          </tr>
        </thead>
        <tbody>
          {details.map(log => (
            <LogRow
              key={log.log_id}
              value={log.log_id}
              book_id={log.book_id}
              user_id={log.user_id}
              timestamp={log.timestamp}
              success={log.success}
              action={log.action}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

UserLogTable.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  count: PropTypes.number.isRequired,
};

export default UserLogTable;
