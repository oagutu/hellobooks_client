import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import send from './Helpers';
import './index.css';
import { connect } from 'net';

class BaseTemplate extends React.Component {

  state = {
      active: "",
      dropdownOpen: false,
      isAdmin: false,
      to: {
          add_update_book:'/test_add',
      },
      referred: "",
      redirectToReferrer:false
  }

  handleClick = (e) => {
    e.preventDefault()
    const id = e.target.id
    this.setState({referred:e.target.value})
    this.setState({redirectToReferrer: true})
    console.log(this.state.to);
  }

  toggle = () => {
      this.setState({dropdownOpen:!this.state.dropdownOpen})
  };

  render() {

    const { from } = this.props.location || { from: { pathname: this.state.referred } }
    console.log(this.state.referred)
    
    if (this.state.redirectToReferrer === true) {
        return <Redirect to= {from} />
      }

    return (
      <div>
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
              <div isOpen={this.state.isAdmin}>
                <DropdownItem header>Admin</DropdownItem>
                <DropdownItem id="add-update-book" onClick={this.handleClick} value='/test_add'><i className="fa fa-plus"></i>Add/Update Book</DropdownItem>
                <DropdownItem id="members"><i className="fa fa-users"></i>Members' List</DropdownItem>
                <DropdownItem id="logs"><i className="fa fa-th"></i>Logs</DropdownItem>
              </div>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-power-off"></i>Logout</DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </nav>
        <div>
            fd
            fsdgz
            awre
        </div>
      </div>
    );
  }
}

export default BaseTemplate;
