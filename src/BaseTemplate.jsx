import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import send from './Helpers';
import './index.css';

/** Navbar template component that is shared by all other components in the hello books app */
class BaseTemplate extends Component {

  /** Component state holds data on state of menu dropdown, admin statut and active tab/page  */
  state = {
      active: "",
      dropdownOpen: false,
      isAdmin: false,
  }

  /** Log out already logged in user. */
  handleLogOut = () => {
    send({}, 'POST', '/api/v1/auth/logout')
      .then((response) => { return response.status; })
      .then((status) => {
        if (status === 200 || status === 401){
          localStorage.clear()
          this.props.history.push({ pathname: '/' })
        }
      });
  };

  /** Toggle state of dropdown menu to make visible when required. */
  toggle = () => {
      this.setState({dropdownOpen:!this.state.dropdownOpen})
  };

 componentDidMount = () => {
  // Set role of logged in user ie. if they are an admin or not
  const role = localStorage.getItem('hb_user_role')
  const isAdmin = role === 'admin' ? true : false
  this.setState({isAdmin})
 }

  /** Renders navbar based on whether a user is logged in or not. */
  render() {
    
  
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
              {/* Displayed only if user logged in with admin account */}
              <div hidden={!this.state.isAdmin}>
                <DropdownItem divider />
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
