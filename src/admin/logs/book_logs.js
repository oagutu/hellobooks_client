import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import LogRow from './log_row';

class BookLogTable extends Component {
  state = {
    isResultLimited: false,
  }

  render() {
    console.log('user_logs: ', this.props);
    const { details } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>timestamp</th>
            <th>book_id</th>
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

BookLogTable.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  count: PropTypes.number.isRequired,
};

export default BookLogTable;