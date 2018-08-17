import React, { Component } from 'react';
import {Modal, ModalBody, ModalHeader, Button, Alert} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import SignupForm from './Signup'
import send from '../Helpers'
import './landing.css';

class SigninForm extends Component {
  state = {
    user_details: {username: "", password: ""},
    show: false,
    showAlert: false,
    error_msg: "",
    redirectToReferrer:false
  }

  handleChange = (e) => {
    const id = e.target.id
    const param = id === 'username_login' ? {username:e.target.value, password:this.state.user_details.password} : 
    {password:e.target.value, username:this.state.user_details.username}
    this.setState({user_details: param})
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({showAlert: false})
    send(this.state.user_details, 'POST', '/api/v1/auth/login')
    .then(response => {return response.json()})
    .then(data => {
      if(Object.values(data).toString().includes(this.state.user_details.username) && data.access_token){
            localStorage.setItem('hb_access_token', data.access_token)
            localStorage.setItem('isAuthenticated', true)
            localStorage.setItem('hb_user_role', data.role)
            const isAdmin = data.role === 'admin' ? true : false
            localStorage.setItem('isAdmin', isAdmin)
            this.setState({redirectToReferrer:true})
          }
      else if(data.msg.includes("Token has expired")){
        localStorage.removeItem('hb_access_token')
        localStorage.setItem('isAuthenticated', false)
        localStorage.removeItem('hb_user_role')
      }
      else{
        this.setState({showAlert: !this.state.showAlert, error_msg: data.msg})
      }
    })
  };

  toggle = () => {
    this.setState({show: !this.state.show})
  }

  render() {

    const { from } = this.props.location || { from: { pathname: '/home' } }

    if (this.state.redirectToReferrer === true) {
      return <Redirect to= {from} />
    }

    return(
      <div className="container login-container">
        <Alert isOpen={this.state.showAlert} color="warning">
          {this.state.error_msg}
        </Alert>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>login:</legend>
            <input
            type="text"
            id="username_login"
            placeholder="username"
            onChange={this.handleChange}/>
            <br/>
            <br/>
            <input
            type="password"
            id="password_login"
            placeholder="password"
            onChange={this.handleChange}/>
            <br/>
          </fieldset>
          <br/>
            <button type="submit" className="sign-in-btn">sign in</button>
        </form>
        <p style={{ margin_top:"15px" }}>
          Don't have an account?<Button onClick= {this.toggle} className="signup-btn">Sign Up</Button>
        </p>

        <Modal isOpen={this.state.show} toggle={this.toggle}>

          <ModalHeader toggle={this.toggle}>sign up</ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>

        </Modal>
  
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="container login-main">
          <div className="row login-row">
            <div className="col-md-7 login-left signin-left">
                <div className="container login-pg-text">
                  <h1>Your Library Solution</h1>
                  <p className="login-pg-msg">We have thousands of books...
                    <br/>plus whichever one you you just so happen to need...
                  </p>
                </div>
            </div>
            <div className="col-md-5 login-right signin-right">
              <SigninForm />
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;

// TODO: Mobve navbar into login-main container so landing page only occupies window ie. no scrolling 
