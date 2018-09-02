import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import BorrowRow from './borrow-row';
import './history.css';

/** Borrow history main component.
 * Displays table with either returned or unreturned books.
 */
const BorrowHistory = (props) => {
  const { borrow_details, updateStateOnReturn } = props;
  return (
    <div className="container">
      <Table className="books-table">
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>borrow date</th>
            <th>due date</th>
            <th>return date</th>
            <th>fee owed</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map each borrow details array aelement to individual borrowed row component */}
          {borrow_details.map(m => (
            <BorrowRow
              key={m.borrow_id}
              value={m.borrow_id}
              book_id={m.book_id}
              title={m.book_title}
              borrow_date={m.borrow_date}
              due_date={m.due_date}
              return_date={m.return_date}
              fee_owed={m.fee_owed}
              status={m.status}
              updateStateOnReturn={updateStateOnReturn}
            />))}
        </tbody>
      </Table>
    </div>
  );
};

BorrowHistory.propTypes = {
  borrow_details: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateStateOnReturn: PropTypes.func.isRequired,
};

export default BorrowHistory;
