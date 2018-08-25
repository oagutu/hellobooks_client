import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import send from './Helpers';
import './index.css';

/** Navbar template component that is shared by all other components in the hello books app */
class BaseTemplate extends Component {
  /** Component state holds data on state of menu dropdown, admin statut and active tab/page  */
  state = {
    dropdownOpen: false,
    isAdmin: false,
  }

  componentDidMount = () => {
    // Set role of logged in user ie. if they are an admin or not
    const role = localStorage.getItem('hb_user_role');
    const isAdmin = role === 'admin';
    this.setState({ isAdmin });
  }

  /** Log out already logged in user. */
  handleLogOut = () => {
    const { history } = this.props;
    send({}, 'POST', '/api/v1/auth/logout')
      .then((response) => {
        console.log(response.status);
        if (response.status === 200 || response.status === 401) {
          return response.json();
        } return undefined;
      })
      .then((data) => {
        if (data.message === 'Successfully logged out') {
          localStorage.clear();
          history.push({ pathname: '/' });
          NotificationManager.info(data.message, 'logout success:');
        }
      });
  };

  /** Toggle state of dropdown menu to make visible when required. */
  toggle = () => {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  /** Renders navbar based on whether a user is logged in or not. */
  render() {
    const { dropdownOpen, isAdmin } = this.state;

    if (!localStorage.getItem('isAuthenticated')) {
      return (
        <nav className="navbar">
          <a className="navbar-brand brand-log" href="/">hello
            <b style={{ color: 'tomato' }}>books</b>
          </a>
        </nav>
      );
    }

    return (
      <nav className="navbar fixed-top">
        <a className="navbar-brand brand-main" href="/home">
            hello
          <b style={{ color: 'white' }}>
              books
          </b>
        </a>

        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <i className="fa fa-user-circle-o" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem id="prof-btn"><Link to="/profile"><i className="fa fa-user" />Profile</Link></DropdownItem>
            <DropdownItem id="history"><Link to="/borrow-history"><i className="fa fa-history" />History</Link></DropdownItem>
            {/* Displayed only if user logged in with admin account */}
            <div hidden={!isAdmin}>
              <DropdownItem divider />
              <DropdownItem header>Admin</DropdownItem>
              <DropdownItem id="add-book"><Link to="/add-book"><i className="fa fa-plus" />Add/Update Book</Link></DropdownItem>
              <DropdownItem id="members"><Link to="/all-members"><i className="fa fa-users" />Members&apos; List</Link></DropdownItem>
              <DropdownItem id="logs"><Link to="/home"><i className="fa fa-th" />Logs</Link></DropdownItem>
            </div>
            <DropdownItem divider />
            <DropdownItem onClick={this.handleLogOut}><i className="fa fa-power-off" />Logout</DropdownItem>

          </DropdownMenu>
        </Dropdown>
      </nav>
    );
  }
}

BaseTemplate.propTypes = {
  history: PropTypes.shape().isRequired,
};

// Pass updated match, location, and history props to BaseTemplate component whenever it renders.
export default withRouter(BaseTemplate);
