import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import BookRow from './bookrow';
import '../home.css';


class Books extends Component {
    state = { isAdmin: false }

    componentDidMount =() => {
      // Set role of logged in user ie. if they are an admin or not. Used to hide admin actions.
      const role = localStorage.getItem('hb_user_role');
      const isAdmin = role === 'admin';
      this.setState({ isAdmin });
    }

    render() {
      const { books } = this.props;
      const { isAdmin } = this.state;

      return (
        <div className="container body-sec">
          <h3 className="library-table">Library</h3>
          <Table className="books-table">
            <thead>
              <tr>
                <th>#</th>
                <th>title</th>
                <th>author</th>
                <th>book code</th>
                <th>genre</th>
                <th>sub-genre</th>
                <th>synopsis</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(m => (
                <BookRow
                  key={m.book_id}
                  value={m.book_id}
                  title={m.title}
                  author={m.author}
                  book_code={m.book_code}
                  ddc_code={m.ddc_code}
                  genre={m.genre}
                  sub_genre={m.sub_genre}
                  synopsis={m.synopsis}
                  isAdmin={isAdmin}
                />))}
            </tbody>
          </Table>
        </div>
      );
    }
}

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Books;
