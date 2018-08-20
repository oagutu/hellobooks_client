import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Alert} from 'reactstrap';
import send from '../Helpers';
import './admin.css';

class AddEdit extends Component {
    state = {
      book_details:{title:"", author:"", book_code: Number, ddc_code:"", synopsis:"", genre:"", subgenre:""},
      showAlert: false,
      error_message: "",
    }
  
    handleChange = (e) => {
      const id = e.target.id
      const book_details = Object.assign({}, this.state.book_details)
      book_details[id] = e.target.value
      this.setState({book_details})
      // console.log(this.state.book_details)
    }
  
    handleSubmit = (e) => {
      e.preventDefault()
      this.setState({showAlert:false})
      // Helps convert book code to integer type as is required by  add book endpoint.
      const book_details = Object.assign({},
        this.state.book_details,
        {book_code: Number(this.state.book_details.book_code)})
  
      send(book_details, this.props.method, this.props.path)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        if(Object.values(data).toString().includes('Successfully')){
          this.setState({
          showAlert: !this.state.showAlert,
          error_message: data.msg})
          this.props.history.push({ pathname: '/home' })
        }
        else{
          this.setState({
            showAlert: !this.state.showAlert,
            error_message: data.msg})
        }
      })
    }

    componentDidMount = () => {
      if(this.props.isHeader){
        console.log("+++", this.props.details)
        const book_details = Object.assign({}, this.props.details)
        this.setState({book_details})
      }
    }
  
    render(){
      // console.log(this.state.book_details)
  
      return (
        
        <div className="container body-sec">
  
          <Alert isOpen={this.state.showAlert} color="warning">
            {this.state.error_message}
          </Alert>
  
          <h2 className="page-header" hidden={this.props.isHeader}>Add a Book:</h2>
          <form className="addbook_form" onSubmit={this.handleSubmit}>
            <input type="text" id="title" placeholder="title" onChange={this.handleChange} value={this.state.book_details.title}/><br/>
            <input type="number" id="book_code" placeholder="code" onChange={this.handleChange} value={this.state.book_details.book_code}/>
            <input type="text" id="ddc_code" placeholder="DDC code" onChange={this.handleChange} value={this.state.book_details.ddc_code}/><br/>
            <input type="text" id="author" placeholder="author" onChange={this.handleChange} value={this.state.book_details.author}/><br/>
            <textarea
              id="synopsis"
              name="book_synopsis"
              placeholder="synopsis"
              style={{ width:"100%", height:"auto"}}
              onChange={this.handleChange}
              value={this.state.book_details.synopsis}>
            </textarea><br/>
            genre:
            <select name="select genre" id="genre" className="genre" onChange={this.handleChange} value={this.state.book_details.genre}>
              <option disabled>select genre</option>
              <option value="fiction" defaultValue>fiction</option>
              <option value="non-fiction">non-fiction</option>
            </select>
            sub-genre
            <select name="select sub-genre" id="subgenre" className="sub-genre" onChange={this.handleChange} value={this.state.book_details.subgenre}>
              <option disabled>select subgenre</option>
              <option defaultValue>NA</option>
              <option value="sci-fi">sci-fi</option>
              <option value="fantasy">fantasy</option>
              <option value="biopic">biopic</option>
              <option value="romance">romance</option>
              <option value="young adult">young adult</option>
              <option value="children's">children's</option>
              <option value="other">other</option>
            </select><br/>
              <input type="submit" value="save" className="savebook_btn"/>
              <input type="button" value="save and add new" className="addbook_btn"/>
          </form>
        </div>
      )
    }
  }

export default withRouter(AddEdit);
