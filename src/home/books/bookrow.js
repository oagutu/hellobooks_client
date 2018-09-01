/** Holds the individual book rows */

import React, { Component } from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, Tooltip,
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
      tooltipOpen: { edit: false, delete: false, borrow: false },
      show: { edit: false, deleteModal: false, borrow: false },
      path: '/api/v1/books/',
      path_borrow: '/api/v1/users/books/',
      method: 'PUT',
    }

    /** Borrow single book
     * @memberof BookRow
     */
    handleBorrow = () => {
      const { value, title, history } = this.props;
      const { path_borrow } = this.state;
      let { show } = this.state;
      show = Object.assign({}, show);
      send({}, 'POST', path_borrow + String(value))
        .then(response => (response.json()))
        .then((data) => {
          const msg = data.msg ? data.msg : `Successfully borrowed: ${title}. Return Date: ${data.due_date}`;
          history.push({ pathname: '/borrow-history' });
          show.borrow = !show.borrow;
          this.setState({ show });
          NotificationManager.info(msg, 'Borrow Book');
        });
    }

    /** Delete single book entry
     * @memberof BookRow
     */
    handleDelete = () => {
      const { value, title } = this.props;
      const { path } = this.state;
      let { show } = this.state;
      show = Object.assign({}, show);
      send({}, 'DELETE', path + String(value))
        .then((response) => {
          if (response.status === 204) {
            show.deleteModal = !show.deleteModal;
            this.setState({ show });
            NotificationManager.info(`Successfully deleted: ${title}`, 'Delete Book');
          }
        });
    }

    /** Toggle state of tooltips */
    toggleToolTip = (e) => {
      const { id } = e.target;
      let { tooltipOpen } = this.state;
      tooltipOpen = Object.assign({}, tooltipOpen);
      if (id.includes('edit')) {
        tooltipOpen.edit = !tooltipOpen.edit;
      } else if (id.includes('delete')) {
        tooltipOpen.delete = !tooltipOpen.delete;
      } else if (id.includes('borrow')) {
        tooltipOpen.borrow = !tooltipOpen.borrow;
      }
      this.setState({ tooltipOpen });
    }

    /** Toggle state of edit or delete book modals to determine it's visibility to the user */
    toggle = (e) => {
      const { id } = e.target;
      let { show } = this.state;
      show = Object.assign({}, show);
      if (id.includes('edit') && show.edit === false) {
        show.edit = !show.edit;
      } else if (id.includes('delete') && show.deleteModal === false) {
        show.deleteModal = !show.deleteModal;
      } else if (id.includes('borrow') && show.borrow === false) {
        show.borrow = !show.borrow;
      } else {
        show.edit = false;
        show.deleteModal = false;
        show.borrow = false;
      }
      this.setState({ show });
    }

    render() {
      const {
        value, title, author, book_code, genre, sub_genre, synopsis, isAdmin,
      } = this.props;
      const {
        show, path, method, tooltipOpen,
      } = this.state;
      // set IDs of borrow, delete and edit icons.
      const btn_borrow_id = `borrow_${value}`;
      const btn_edit_id = `edit_${value}`;
      const btn_delete_id = `delete_${value}`;

      return (
        <tr>
          <td value={value}>{value}</td>
          <td value={title}>{title}</td>
          <td value={author}>{author}</td>
          <td value={book_code}>{book_code}</td>
          <td value={genre} className="genre">{genre}</td>
          <td value={sub_genre} className="sub_genre">{sub_genre}</td>
          <td value={synopsis}>{synopsis}</td>
          <td value="actions">
            <Button onClick={this.toggle} className="edit-book-btn" hidden={!isAdmin}>
              <i className="fa fa-edit" id={btn_edit_id} />
            </Button>
            <Button onClick={this.toggle} className="delete-book-btn" hidden={!isAdmin}>
              <i className="fa fa-trash" id={btn_delete_id} />
            </Button>
            <Button onClick={this.toggle} className="borrow-book-btn">
              <i className="fa fa-bookmark" id={btn_borrow_id} />
            </Button>
            {/* Tooltips for the borrow,edit and delete icons under actions column. */}
            <Tooltip placement="bottom-start" isOpen={tooltipOpen.borrow} target={btn_borrow_id} toggle={this.toggleToolTip}>
              borrow
            </Tooltip>
            <Tooltip placement="bottom-start" isOpen={tooltipOpen.edit} target={btn_edit_id} toggle={this.toggleToolTip}>
              edit
            </Tooltip>
            <Tooltip placement="bottom-start" isOpen={tooltipOpen.delete} target={btn_delete_id} toggle={this.toggleToolTip}>
              delete
            </Tooltip>
          </td>

          {/* Edit book modal */}
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

          {/* Delete book modal */}
          <Modal isOpen={show.deleteModal} toggle={this.toggle} className="delete_book_modal">
            <ModalHeader toggle={this.toggle}>Delete Book:</ModalHeader>
            <ModalBody>
              <div>
                <p> Are you sure you want to delete
                  <span> { title }</span>?
                  <p>Author: <span> { author } </span></p>
                </p>
              </div>
              <div className="confirm-delete">
                <Button
                  onClick={this.handleDelete}
                  style={{ backgroundColor: '#d9534f' }}
                >
                  Delete
                </Button>
              </div>
            </ModalBody>
          </Modal>

          {/* borrow book model */}
          <Modal isOpen={show.borrow} toggle={this.toggle} className="borrow_book_modal">
            <ModalHeader toggle={this.toggle}>Borrow Book:</ModalHeader>
            <ModalBody>
              <div>
                <p> Are you sure you want to borrow
                  <span> { title } ?</span>
                </p>
              </div>
              <div className="confirm-borrow">
                <Button
                  onClick={this.handleBorrow}
                  style={{ backgroundColor: '#337ab7', float: 'right' }}
                >
                  Borrow
                </Button>
              </div>
            </ModalBody>
          </Modal>

          {/* Show more book details */}
          <Modal isOpen={show.moreDetailsModal} toggle={this.toggle} className="show_book_details_modal">
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
              <div>
                <p>
                  {synopsis}
                </p>
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
