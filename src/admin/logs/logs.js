import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserLogTable from './user_logs';
import BookLogTable from './book_logs';
import send, { sessionExpire } from '../../Helpers';

/**
 * Main logs component
 *
 * @class Log
 * @extends {Component}
 */
class Log extends Component {
  state = {
    book_logs: [],
    user_logs: [],
    count: 0,
  }

  /**
   * Fetch log data from endpoint on component loading
   */
  componentDidMount = () => {
    const { history } = this.props;
    send({}, 'GET', '/api/v1/auth/users/logs')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ user_logs: data.logs, count: data.count });
      })
      .catch(() => {
        sessionExpire(history);
      });

    send({}, 'GET', '/api/v1/users/books/logs')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ book_logs: data.logs, count: data.count });
      })
      .catch(() => {
        sessionExpire(history);
      });
  }

  render() {
    const { user_logs, book_logs, count } = this.state;

    return (
      <div className="container body-sec">
        <div className="container log-body">
          <div className="row">
            <div className="col-xs-6 col-md-6 user-logs">
              <h5>user logs: </h5>
              <UserLogTable details={user_logs} count={count} />
            </div>
            <div className="col-xs-6 col-md-6 book-logs">
              <h5>book logs: </h5>
              <BookLogTable details={book_logs} count={count} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Log.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Log;
