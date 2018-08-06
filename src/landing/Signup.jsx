import React, { Component } from 'react';
import {Alert} from 'reactstrap';
import send from '../Helpers';
import './landing.css';

class SignupForm extends Component {
    state = {
      user_details: {name: "", username: "", email: "", password: "", confirm_password: ""},
      showAlert: false,
      error_message: "",
      headerRequired: false,
      redirectToReferrer:false
    }
  
    handleChange = (e) => {
      const id = e.target.id
      const user_details = Object.assign({}, this.state.user_details)
      user_details[id] = e.target.value
      this.setState({user_details})
    //   console.log(this.state.user_details)
    }
  
    handleSubmit = (e) => {
      e.preventDefault()
      this.setState({showAlert:false})
      send(this.state.user_details, 'POST', '/api/v1/auth/register', this.state.headerRequired)
      .then(response => {
        return response.json()
      })
      .then(data => {this.setState({
          showAlert: !this.state.showAlert,
          error_message: data.msg
        })})
    }
  
    render(){
      return(
        <div className="container signup-container">
            <Alert isOpen={this.state.showAlert} color="warning">
            {this.state.error_message}
            </Alert>
          <form className="signup-form" onSubmit={this.handleSubmit}>
           <fieldset>
                <input type="text" id="username" placeholder="username" onChange={this.handleChange} required/>
                <br/>
                <input type="text" id="name" placeholder="name" onChange={this.handleChange} required/>
                <br/>
                <input type="email" id="email" placeholder="email" onChange={this.handleChange} required/>
                <br/>
                <input type="password" id="password" placeholder="password" onChange={this.handleChange}required/>
                <br/>
                <input type="password" id="confirm_password" placeholder="confirm password" onChange={this.handleChange} required/>
                <br/>
            </fieldset>
            <br/>
            <button type="submit" className="sign-up-btn">create account</button>
          </form>
        </div>
      );
    }
  }

  export default SignupForm;