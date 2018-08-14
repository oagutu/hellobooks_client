import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './landing/index';
import Home from './home/index';
import Add from './admin/add_book';
import registerServiceWorker from './registerServiceWorker';


const Test = () => <h2>TESTED!</h2>;

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

const Main = () => {
  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route exact path="/" component={App} />
          <PrivateRoute path="/test_home" component={Home} />
          <PrivateRoute path="/add-update" component={Add} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
