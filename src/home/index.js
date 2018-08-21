import React, { Component } from 'react';
import send from '../Helpers';
import Books from './books/books';
import './home.css';

class Home extends Component {
  state = { books: [] }

  componentDidMount = () => {
    send({}, 'GET', '/api/v1/books')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ books: data.books });
        // console.log("home>> ", data)
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

export default Home;
