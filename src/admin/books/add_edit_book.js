import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import send from '../../Helpers';
import '../admin.css';

class AddEdit extends Component {
    state = {
      bookDetails: {
        title: '', author: '', book_code: null, ddc_code: '', synopsis: '', genre: 'fiction', subgenre: 'NA',
      },
      showAlert: false,
      errorMessage: '',
    }

    componentDidMount = () => {
      const { details, isHeader } = this.props;
      if (isHeader) {
        const bookDetails = Object.assign({}, details);
        this.setState({ bookDetails });
      }
    }

    /** Update state based on user actions in input fields */
    handleChange = (e) => {
      const { id } = e.target;
      let { bookDetails } = this.state;
      bookDetails = Object.assign({}, bookDetails);
      bookDetails[id] = e.target.value;
      this.setState({ bookDetails });
      // console.log(bookDetails);
    }

    /** Submit added book data to api endpoint and process response */
    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({ showAlert: false });
      let { bookDetails } = this.state;
      const { showAlert } = this.state;
      // Helps convert book code to integer type as is required by  add book endpoint.
      bookDetails = Object.assign({},
        bookDetails,
        { book_code: Number(bookDetails.book_code) });
      const { method, path, history } = this.props;

      send(bookDetails, method, path)
        .then(response => (
          response.json()))
        .then((data) => {
          console.log(data);
          if (Object.values(data).toString().includes('Successfully')) {
            this.setState({
              showAlert: !showAlert,
              errorMessage: data.msg,
            });
            history.push({ pathname: '/home' });
            NotificationManager.success(data.msg, 'Add/edit book:');
          } else {
            this.setState({
              showAlert: true,
              errorMessage: data.msg,
            });
          }
        });
    }

    render() {
      const { showAlert, errorMessage, bookDetails } = this.state;
      const { isHeader } = this.props;
      // console.log(bookDetails);

      return (

        <div className="container body-sec">

          <Alert isOpen={showAlert} color="warning">
            { errorMessage }
          </Alert>

          <h2 className="page-header" hidden={isHeader}>
            Add a Book:
          </h2>
          <form className="addbook_form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">title
              <input type="text" id="title" placeholder="title" onChange={this.handleChange} value={bookDetails.title} required />
            </label><br />
            {/* <br /> */}
            <label htmlFor="book_code">book code
              <input type="number" id="book_code" placeholder="code" onChange={this.handleChange} value={bookDetails.book_code} required />
            </label> <br />
            <label htmlFor="ddc_code">DDC code
              <input type="text" id="ddc_code" placeholder="DDC code" onChange={this.handleChange} value={bookDetails.ddc_code} required />
            </label><br />
            <label htmlFor="author">author
              <input type="text" id="author" placeholder="author" onChange={this.handleChange} value={bookDetails.author} required />
            </label>
            <br />
            <label htmlFor="synopsis">synopsis
              <textarea
                id="synopsis"
                name="book_synopsis"
                placeholder="synopsis"
                style={{ width: '100%', height: 'auto' }}
                onChange={this.handleChange}
                value={bookDetails.synopsis}
              />
            </label>
            <br />
            <label htmlFor="genre" className="genre_label">genre:
              <select name="select genre" id="genre" className="genre" onChange={this.handleChange} value={bookDetails.genre}>
                <option disabled>
                  select genre
                </option>
                <option value="fiction" defaultValue>
                  fiction
                </option>
                <option value="non-fiction">
                  non-fiction
                </option>
              </select>
            </label>
            <label htmlFor="subgenre" className="genre_label">sub-genre:
              <select name="select sub-genre" id="subgenre" className="sub-genre" onChange={this.handleChange} value={bookDetails.subgenre}>
                <option disabled>
                  select subgenre
                </option>
                <option defaultValue>
                  NA
                </option>
                <option value="sci-fi">
                  sci-fi
                </option>
                <option value="fantasy">
                  fantasy
                </option>
                <option value="biopic">
                  biopic
                </option>
                <option value="romance">
                  romance
                </option>
                <option value="young adult">
                  young adult
                </option>
                <option value="children's">
                  children&apos;s
                </option>
                <option value="other">
                  other
                </option>
              </select>
            </label>
            <br />
            <input type="submit" value="add book" className="savebook_btn" />
          </form>
        </div>
      );
    }
}

AddEdit.defaultProps = {
  isHeader: false,
  details: {},
};

/** Offers typechecking for the AddEdit component props */
AddEdit.propTypes = {
  details: PropTypes.shape(),
  isHeader: PropTypes.bool,
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(AddEdit);
