import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import send, { sessionExpire } from '../Helpers';
import Books from './books/books';
import './home.css';

class Home extends Component {
  state = { books: [] }

  componentDidMount = () => {
    const { history } = this.props;
    send({}, 'GET', '/api/v1/books')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ books: data.books });
        // console.log("home>> ", data)
      })
      .catch(() => {
        sessionExpire(history);
      });
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <Books books={books} />
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Home);
