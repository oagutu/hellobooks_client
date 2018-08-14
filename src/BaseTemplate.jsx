import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import send from './Helpers';
import './index.css';

class BaseTemplate extends Component {

  state = {
      active: "",
      dropdownOpen: false,
      isAdmin: localStorage.getItem('isAdmin'),
      referred: "",
      redirectToReferrer:false
  }

  handleLogOut = () => {
    send({}, 'POST', '/api/v1/auth/logout')
      .then((response) => { return response.status; })
      .then((status) => {
        if (status === 200 || status === 401){
          this.setState({referred:'/', redirectToReferrer: true})
          localStorage.clear()
        }
      });
  };

  handleClick = (e) => {
    e.preventDefault()
    this.setState({referred:e.target.value})
    this.setState({redirectToReferrer: true})
  }

  toggle = () => {
      console.log(this.state.isAdmin)
      this.setState({dropdownOpen:!this.state.dropdownOpen})
  };

  render() {

    const { from } = this.props.location || { from: { pathname: this.state.referred } }
    
    if (this.state.redirectToReferrer === true) {
        return <Redirect to= {from} />
      }

    return (
        <nav className="navbar fixed-top">
          <a className="navbar-brand brand-main" href="library.html">
              hello
            <b style={{ color: 'white' }}>
               books
            </b>
          </a>

          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <i className='fa fa-user-circle-o'></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem id="prof-btn" onClick={this.handleClick} value='/profile'><i className="fa fa-user"></i>Profile</DropdownItem>
              <DropdownItem id="history"><i className="fa fa-history" value='/history'></i>History</DropdownItem>
              <DropdownItem divider />
              {/* Displayed only if user logged in with admin account */}
              <div hidden={!this.state.isAdmin}>
                <DropdownItem header>Admin</DropdownItem>
                <DropdownItem id="logs">{!this.state.isAdmin}</DropdownItem>
                <DropdownItem id="add-update-book" onClick={this.handleClick} value='/add-update'><i className="fa fa-plus"></i>Add/Update Book</DropdownItem>
                <DropdownItem id="members"><i className="fa fa-users"></i>Members' List</DropdownItem>
                <DropdownItem id="logs"><i className="fa fa-th"></i>Logs</DropdownItem>
              </div>
              <DropdownItem divider />
              <DropdownItem onClick={this.handleLogOut}><i className="fa fa-power-off"></i>Logout</DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </nav>
    );
  }
}

export default BaseTemplate;
