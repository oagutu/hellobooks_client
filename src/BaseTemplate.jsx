import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import send from './Helpers';
import './index.css';

class BaseTemplate extends Component {

  state = {
      active: "",
      dropdownOpen: false,
      isAdmin: false,
      isAuthenticated:false,
  }

  handleLogOut = () => {
    send({}, 'POST', '/api/v1/auth/logout')
      .then((response) => { return response.status; })
      .then((status) => {
        if (status === 200 || status === 401){
          console.log(this.props.history)
          localStorage.clear()
          this.props.history.push({ pathname: '/' })
        }
      });
  };

  toggle = () => {
      // console.log(this.state.isAdmin)
      this.setState({dropdownOpen:!this.state.dropdownOpen})
  };

  render() {

    const { from } = this.props.location || { from: { pathname: this.state.referred } }
    // console.log("State asda: ", this.state.isAdmin)

    // if (this.state.redirectToReferrer == true){}
    
    if (!localStorage.getItem('isAuthenticated')){
      return (
        <nav className="navbar">
          <a className="navbar-brand brand-log" href="/">hello
            <b style={{ color:"tomato" }}>books</b>
          </a> 
        </nav>
      )
    }
      
    return (
        <nav className="navbar fixed-top">
          <a className="navbar-brand brand-main" href="/home">
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
              <DropdownItem id="prof-btn"><Link to="/profile"><i className="fa fa-user"></i>Profile</Link></DropdownItem>
              <DropdownItem id="history"><Link to="/borrow-history"><i className="fa fa-history"></i>History</Link></DropdownItem>
              <DropdownItem divider />
              {/* Displayed only if user logged in with admin account */}
              <div>
                <DropdownItem header>Admin</DropdownItem>
                <DropdownItem id="logs">{this.state.isAdmin}</DropdownItem>
                <DropdownItem id="add-book"><Link to="/add-book"><i className="fa fa-plus"></i>Add/Update Book</Link></DropdownItem>
                <DropdownItem id="members"><Link to="/all-members"><i className="fa fa-users"></i>Members' List</Link></DropdownItem>
                <DropdownItem id="logs"><Link to="/home"><i className="fa fa-th"></i>Logs</Link></DropdownItem>
              </div>
              <DropdownItem divider />
              <DropdownItem onClick={this.handleLogOut}><i className="fa fa-power-off"></i>Logout</DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </nav>
    );
}
}

// Pass updated match, location, and history props to BaseTemplate component whenever it renders.
export default withRouter(BaseTemplate);
