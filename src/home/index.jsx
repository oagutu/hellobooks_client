import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Table, Tooltip, Button , Modal, ModalHeader, ModalBody} from 'reactstrap';
import send from '../Helpers';
import BaseTemplate from '../BaseTemplate.jsx';
import {Add} from '../admin/add_book';
import './home.css';


class EditBookForm extends Component {
    state = {
    book_details:{title:"", author:"", book_code: Number, ddc_code:"", synopsis:"", genre:"", subgenre:""},
    showAlert: false,
    error_message: "",
  }

  render () {
    return (
       <Add header='Edit book'/>
    )
  }
}


class BookRow extends Component{
  state = {tooltipOpen: false, show: {edit: false, delete: false}}

  toggle = (e) => {
    const show = Object.assign({}, this.state.show)
    show.edit = !this.state.show.edit
    this.setState({show})
    }

  render() {
    console.log(this.state)
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
          <Button onClick= {this.toggle} className="edit-book-btn"><i className="fa fa-edit"/></Button>
          {/* <Button onClick= {this.toggle} className="delete-book-btn"><i className="fa fa-trash"/></Button> */}
        </td>

        <Modal isOpen={this.state.show.edit} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit User Status:</ModalHeader>
          <ModalBody>
            <div>{this.state.show.edit}</div>
          <EditBookForm user={this.props.username}/>
          </ModalBody>
        </Modal>
      </tr>
        )
    }
}

class Books extends Component {
  render(){

    const books = this.props.books;
    // console.log(books)

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
                genre={m.genre}
                sub_genre={m.sub_genre}
                synopsis={m.synopsis}
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
      // console.log("home>> ", this.state)
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
