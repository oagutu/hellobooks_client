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

  render() {
    const { borrow_details } = this.state;
    console.log(borrow_details);

    return (
      <div>
        <BorrowHistory borrow_details={borrow_details} />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Home);
