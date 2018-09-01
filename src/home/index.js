/** Main home component */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import send, { sessionExpire } from '../Helpers';
import Books from './books/books';
import './home.css';


class Home extends Component {
  state = { results: {}, path: '/api/v1/books?results=3', isSearch: false }

  componentDidMount = () => {
    const { history } = this.props;
    const { path } = this.state;
    this.get_books(history, path);
  }

  /** Get books based on specified path */
  get_books = (history, path) => {
    send({}, 'GET', path)
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ results: data });
      })
      .catch(() => {
        sessionExpire(history);
      });
  };

  /** Handle page requests ie. pagination */
  handlePagination = (e) => {
    const { history } = this.props;
    const { path, results } = this.state;
    const { next_url, prev_url } = results;
    const { id } = e.target;
    if (['undefined', null].includes(id)) {
      this.get_books(history, path);
    } else if (['prev', 'next'].includes(id)) {
      this.get_books(history, id === 'next' ? next_url : prev_url);
    } else {
      this.get_books(history, `${path}&page=${id}`);
    }
  }

  /** Continually search for books as long as there's user input */
  handleChange = (e) => {
    const { value } = e.target;
    const { history } = this.props;
    if (!['undefined', ''].includes(value)) {
      this.get_books(history, `/api/v1/books/search?q=${value}`);
      this.setState({ isSearch: true });
    }
  }

  render() {
    const { results, isSearch } = this.state;
    const page_list = Array.from({ length: results.pages }, (v, k) => k + 1);

    return (
      <div>
        <Books
          books={results.books}
          page_list={page_list}
          handlePagination={this.handlePagination}
          isNotNext={results.pages === results.current_page}
          isNotPrev={results.current_page === 1 || isSearch}
          current={results.current_page}
          handleChange={this.handleChange}
        />
        <div className="container tot-pages">
          <div className="row">
            <div className="col-sm-4">
              current page: <span>{results.current_page}</span>
            </div>
            <div className="col-sm-4">
              total pages: <span>{results.pages}</span>
            </div>
            <div className="col-sm-4">
              results per page: <span>{results.no_of_results}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Home;
