/** Holds the individual borrowed book details */

import React, { Component } from 'react';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import send from '../Helpers';


/**
 * User borrow history table row component
 *
 * @class BorrowHistory
 * @extends {Component}
 */
class BorrowHistory extends Component {
  state = { returnOpen: false, path: '/api/v1/users/books/', isReturned: false }

  componentDidMount = () => {
    let { isReturned } = this.state;
    const { status } = this.props;
    isReturned = status === 'returned';
    this.setState({ isReturned });
  }

  /**
   * Return single book.
   */
  handleReturn = () => {
    const {
      book_id, title, history, updateStateOnReturn,
    } = this.props;
    const { path } = this.state;
    // Access return book endpoint.
    send({}, 'PUT', path + String(book_id))
      .then(response => (response.json()))
      .then((data) => {
        const msg = data.msg ? data.msg : `Successfully returned: ${title}`;
        // Update borrowed books table component according to book returned.
        updateStateOnReturn(data);

        // Toggle return modal off.
        let { returnOpen, isReturned } = this.state;
        returnOpen = !returnOpen;
        isReturned = !isReturned;
        this.setState({ returnOpen, isReturned });
        history.push({ pathname: '/borrow-history' });
        NotificationManager.info(msg, 'Return Book');
      });
  }

  /** Toggle return modal state on/off */
  toggle = () => {
    let { returnOpen } = this.state;
    returnOpen = !returnOpen;
    this.setState({ returnOpen });
  }

  render() {
    const {
      value, title, borrow_date, return_date, due_date, fee_owed, status,
    } = this.props;
    const { returnOpen, isReturned } = this.state;

    return (
      <tr>
        <td value={value}>{value}</td>
        <td value={title}>{title}</td>
        <td value={borrow_date}>{borrow_date}</td>
        <td value={due_date}>{due_date}</td>
        <td value={return_date}>{return_date}</td>
        <td value={fee_owed} className="fee-cell">{fee_owed}</td>
        <td value={status} className="status-cell">{status}</td>
        <td hidden={isReturned}>
          <Button onClick={this.toggle}>return</Button>
        </td>
        {/* Return borrowed book modal */}
        <Modal isOpen={returnOpen} toggle={this.toggle} className="return_book_modal">
          <ModalHeader toggle={this.toggle}>Return Book:</ModalHeader>
          <ModalBody>
            <div>
              <p> Return
                <span> { title } ?</span>
              </p>
            </div>
            <div className="confirm-return">
              <Button
                onClick={this.handleReturn}
                style={{ backgroundColor: 'green', float: 'right' }}
              >
                Return
              </Button>
            </div>

          </ModalBody>
        </Modal>
      </tr>
    );
  }
}

BorrowHistory.defaultProps = {
  return_date: null,
  fee_owed: null,
};

BorrowHistory.propTypes = {
  value: PropTypes.number.isRequired,
  book_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  borrow_date: PropTypes.string.isRequired,
  return_date: PropTypes.string,
  due_date: PropTypes.string.isRequired,
  fee_owed: PropTypes.number,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  updateStateOnReturn: PropTypes.func.isRequired,
};

export default withRouter(BorrowHistory);
