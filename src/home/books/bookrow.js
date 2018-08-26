/** Holds the individual book rows */

import React, { Component } from 'react';
import {
  Button, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import AddEdit from '../../admin/books/add_edit_book';
import send from '../../Helpers';
import '../home.css';


/** Component for each book entry/row. */
class BookRow extends Component {
    state = {
      // tooltipOpen: false,
      show: { edit: false, delete: false },
      path: '/api/v1/books/',
      method: 'PUT',
    }

    /** Delete single book entry */
    handleDelete = () => {
      const { value, history, title } = this.props;
      const { path } = this.state;
      send({}, 'DELETE', path + String(value))
        .then((response) => {
          if (response.status === 204) {
            history.push({ pathname: '/home' });
            NotificationManager.info(`Successfully deleted: ${title}`, 'Delete Book');
          }
        });
    }

    /** Toggle state of edit or delete book modals to determine it's visibility to the user */
    toggle = (e) => {
      const { id } = e.target;
      let { show } = this.state;
      show = Object.assign({}, show);
      if (id === 'edit' && show.edit === false) {
        show.edit = !show.edit;
      } else if (id === 'delete' && show.delete === false) {
        show.delete = !show.delete;
      } else {
        show.edit = false;
        show.delete = false;
      }
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
              <i className="fa fa-edit" id="edit" />
            </Button>
            <Button onClick={this.toggle} className="delete-book-btn" hidden={!isAdmin}>
              <i className="fa fa-trash" id="delete" />
            </Button>
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
          <Modal isOpen={show.delete} toggle={this.toggle} className="delete_book_modal">
            <ModalHeader toggle={this.toggle}>Delete Book:</ModalHeader>
            <ModalBody>
              <div>
                <p> Are you sure you want to delete
                  <span> { title } ?</span>
                </p>
              </div>
              <div className="confirm-delete">
                <Button
                  onClick={this.handleDelete}
                  style={{ backgroundColor: 'red' }}
                >
                  Delete
                </Button>
              </div>
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
  history: PropTypes.shape().isRequired,
};

export default withRouter(BookRow);
