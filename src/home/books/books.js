import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Pagination, PaginationItem, Button,
} from 'reactstrap';
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
      const {
        books, page_list, handlePagination, isNotNext, isNotPrev, handleChange,
      } = this.props;
      const { isAdmin } = this.state;

      return (
        <div className="container body-sec">
          <h3 className="library-table">Library</h3>
          <div className="table-ctrl">
            <form className="search-form">
              <input type="text" placeholder="&#xF002; search author/title" onChange={handleChange} style={{ fontFamily: 'Arial, FontAwesome' }} />
            </form>

            {/* Page element consisting of buttons that load corresponding results */}
            <Pagination className="pages-books">
              <PaginationItem hidden={isNotPrev}>
                <Button onClick={handlePagination} id="prev"><i className="fa fa-angle-left" /> prev</Button>
              </PaginationItem>
              {
                page_list.map(
                  pg => (
                    <PaginationItem key={pg}>
                      <Button onClick={handlePagination} id={pg}>{pg}</Button>
                    </PaginationItem>
                  ),
                )
              }
              <PaginationItem hidden={isNotNext}>
                <Button onClick={handlePagination} id="next">next <i className="fa fa-angle-right" /></Button>
              </PaginationItem>
            </Pagination>
          </div>
          {/* Main table elements holding all books and correpsonding details */}
          <Table className="books-table" id="books-table">
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
              {/* map the array holding all returned books to an individual table row component */}
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

Books.defaultProps = {
  books: [],
};

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()),
  page_list: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handlePagination: PropTypes.func.isRequired,
  isNotNext: PropTypes.bool.isRequired,
  isNotPrev: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  // current_page: PropTypes.number.isRequired,
};

export default Books;
