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
import registerServiceWorker from './registerServiceWorker';


// const Test = () => (<h2>TESTED!</h2>);

// Represents all protected routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('isAuthenticated')
        ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )}
  />
);

const Main = () => (
  <Router>
    <div className="main-container">
      <Navbar />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={App} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/add-book" component={Add} />
        <PrivateRoute path="/all-members" component={Members} />
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
