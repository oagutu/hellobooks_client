import React, { Component } from 'react';
import { Alert, Table, Tooltip, Button , Modal, ModalHeader, ModalBody} from 'reactstrap';
import send from '../Helpers';
import AddEdit from '../admin/add_edit_book';
import './home.css';

/** Edit sintle book entry component */
class EditBook extends Component {
    state = {
    path: `/api/v1/books/${this.props.book_details.value}`,
    method: 'PUT',
  }

  render () {
    return (
       <AddEdit
       isHeader={true}
       details={this.props.book_details}
       path={this.state.path }
       method={this.state.method}/>
    )
  }
}

/** Component for each book entry/row. */
class BookRow extends Component{
  state = {tooltipOpen: false, show: {edit: false, delete: false}}

  toggle = (e) => {
    const show = Object.assign({}, this.state.show)
    show.edit = !this.state.show.edit
    this.setState({show})
    }

  render() {
    return (
      <tr>
        <td value={this.props.value}>{this.props.value}</td>
        <td value={this.props.title}>{this.props.title}</td>
        <td value={this.props.author}>{this.props.author}</td>
        <td value={this.props.book_code}>{this.props.book_code}</td>
        <td value={this.props.genre}>{this.props.genre}</td>
        <td value={this.props.sub_genre}>{this.props.sub_genre}</td>
        <td value={this.props.synopsis}>{this.props.synopsis}</td>
        <td value="actions">
          <Button onClick= {this.toggle} className="edit-book-btn"  hidden={!this.props.isAdmin}><i className="fa fa-edit"/></Button>
          {/* <Button onClick= {this.toggle} className="delete-book-btn"><i className="fa fa-trash"/></Button> */}
        </td>

        <Modal isOpen={this.state.show.edit} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Book:</ModalHeader>
          <ModalBody>
            <div>{this.state.show.edit}</div>
          <EditBook book_details={this.props}/>
          </ModalBody>
        </Modal>
      </tr>
        )
    }
}

class Books extends Component {
  state = {isAdmin: false}

  componentDidMount =() => {
    // Set role of logged in user ie. if they are an admin or not. Used to hide admin actions.
    const role = localStorage.getItem('hb_user_role')
    const isAdmin = role === 'admin' ? true : false
    this.setState({isAdmin})
  }
  render(){

    const books = this.props.books;

    return (
      <div className="container body-sec">
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
              {books.map((m) => <BookRow
                key={m.book_id}
                value={m.book_id}
                title={m.title}
                author={m.author}
                book_code={m.book_code}
                ddc_code={m.ddc_code}
                genre={m.genre}
                sub_genre={m.sub_genre}
                synopsis={m.synopsis}
                isAdmin={this.state.isAdmin}
                />)}
            </tbody>
          </Table>
        </div>
    )
  }
}

class Home extends Component {
  state = { books:[]}

  componentDidMount = () => {
    send({}, 'GET', '/api/v1/books')
    .then(response => {return response.json()})
    .then(data => {
      this.setState({books:data.books})
      // console.log("home>> ", data)
    })
  }

  render() {
    return (
      <div>
        <Books books={this.state.books} />
      </div>
    )
  }
}

export default Home;
