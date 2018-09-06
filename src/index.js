import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Navbar from './BaseTemplate';
import App from './landing/index';
import Home from './home/index';
import Profile from './profile/profile';
import Add from './admin/books/add_book';
import Members from './admin/members/members';
import Logs from './admin/logs/logs';
import History from './history/history';
import registerServiceWorker from './registerServiceWorker';

/**
 * Represents all protected routes
 *
 * @param {*} { component: Component, ...rest }
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('isAuthenticated')
        ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )}
  />
);

/**
 * Main app component.
 * All routes declared here
 *
 */
const Main = () => (
  <Router>
    <div className="main-container">
      {/* Navbar used across the app amnd so is not declared within the switch */}
      <Navbar />
      <NotificationContainer />
      {/* switch component runs through all requested paths until one matches */}
      <Switch>
        {/* landing page */}
        <Route exact path="/" component={App} />
        {/* home page/ default authenticated user page */}
        <PrivateRoute path="/home" component={Home} />
        {/* user profile page */}
        <PrivateRoute path="/profile" component={Profile} />
        {/* user borrow history page */}
        <PrivateRoute path="/borrow-history" component={History} />
        {/* [ADMiN ONLY]add book page */}
        <PrivateRoute path="/add-book" component={Add} />
        {/* list all members page */}
        <PrivateRoute path="/all-members" component={Members} />
        {/* action logs page */}
        <PrivateRoute path="/action-logs" component={Logs} />
      </Switch>
    </div>
  </Router>
);

PrivateRoute.defaultProps = {
  location: { pathname: '/home' },
};

PrivateRoute.propTypes = {
  location: PropTypes.shape(),
  component: PropTypes.func.isRequired,
};

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
