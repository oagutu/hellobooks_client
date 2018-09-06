import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import LogRow from './log_row';

/**
 * Book actions log component
 *
 * @class BookLogTable
 * @extends {Component}
 */
class BookLogTable extends Component {
  state = {
    isResultLimited: false,
  }

  /**
   * Display book actions log table
   *
   * @returns table component
   * @memberof BookLogTable
   */
  render() {
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
