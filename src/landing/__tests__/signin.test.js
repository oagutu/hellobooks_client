import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { fetchMock } from 'fetch-mock';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Signin from '../signin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Signin /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('test user login', () => {
  const handleChange = sinon.spy();
  const wrapper = mount(<Router><Signin change={handleChange} /></Router>);
  wrapper.find('#username_login').simulate('change');
  wrapper.find('#password_login').simulate('change');
});
