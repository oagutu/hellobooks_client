import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './landing/index.jsx'; 
import registerServiceWorker from './registerServiceWorker';


const TestHome = () => <h2>logged In</h2>;

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
          <PrivateRoute path="/test_home" component={TestHome} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
