import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import send, { sessionExpire } from '../Helpers';
import BorrowHistory from './history-borrow';
import './history.css';

class Home extends Component {
  state = { borrow_details: [] }

  componentDidMount = () => {
    const { history } = this.props;
    send({}, 'GET', '/api/v1/users/books')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ borrow_details: data });
        // console.log('home>> ', data);
      })
      .catch(() => {
        sessionExpire(history);
      });
  }

  /** Update borrowed book component based on returned book. */
  updateStateOnReturn = (data) => {
    const { borrow_details } = this.state;
    // Get index of returned book in this.state.borrow_details and update the element at said index.
    let returned_book = borrow_details.filter(detail => detail.borrow_id === data.borrow_id)[0];
    returned_book = Object.assign(returned_book,
      { return_date: data.return_date, fee_owed: data.fee_owed, status: data.status });
    const index_returned = borrow_details.indexOf(returned_book);
    borrow_details[index_returned] = returned_book;
    this.setState({ borrow_details });
  }

  render() {
    const { borrow_details } = this.state;

    return (
      <div>
        <BorrowHistory
          borrow_details={borrow_details}
          updateStateOnReturn={this.updateStateOnReturn}
        />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Home);
