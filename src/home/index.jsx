import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import send from '../Helpers';
import BaseTemplate from '../BaseTemplate.jsx';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <BaseTemplate />
      </div>
    )
  }
}

export default Home;
