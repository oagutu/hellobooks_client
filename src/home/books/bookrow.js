/** Holds the individual book rows */

import React, { Component } from 'react';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import AddEdit from '../../admin/books/add_edit_book';
import '../home.css';


/** Component for each book entry/row. */
class BookRow extends Component {
    state = {
      // tooltipOpen: false,
      show: { edit: false, delete: false },
      path: '/api/v1/books/',
      method: 'PUT',
    }

    toggle = () => {
      let { show } = this.state;
      show = Object.assign({}, show);
      show.edit = !show.edit;
      this.setState({ show });
    }

    render() {
      const {
        value, title, author, book_code, genre, sub_genre, synopsis, isAdmin,
      } = this.props;
      const { show, path, method } = this.state;

      return (
        <tr>
          <td value={value}>{value}</td>
          <td value={title}>{title}</td>
          <td value={author}>{author}</td>
          <td value={book_code}>{book_code}</td>
          <td value={genre}>{genre}</td>
          <td value={sub_genre}>{sub_genre}</td>
          <td value={synopsis}>{synopsis}</td>
          <td value="actions">
            <Button onClick={this.toggle} className="edit-book-btn" hidden={!isAdmin}>
              <i className="fa fa-edit" />
            </Button>
            {/* <Button onClick={this.toggle} className="delete-book-btn">
              <i className="fa fa-trash" />
            </Button> */}
          </td>

          <Modal isOpen={show.edit} toggle={this.toggle} className="edit_book_modal">
            <ModalHeader toggle={this.toggle}>Edit Book:</ModalHeader>
            <ModalBody>
              <div>{show.edit}</div>
              <AddEdit
                isHeader
                details={this.props}
                path={path + String(value)}
                method={method}
              />
            </ModalBody>
          </Modal>
        </tr>
      );
    }
}

BookRow.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  book_code: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  sub_genre: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default BookRow;
