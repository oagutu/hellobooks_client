import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import Signup from '../Signup';

it('renders signup form', () => {
  const toggle = jest.fn();
  const wrapper = mount(<Router><Signup toggle={toggle} /></Router>);
  expect(wrapper.find('.signup-form')).toBeDefined();
});

it('check input change on user action', () => {
  const handleChange = jest.fn();
  const toggle = jest.fn();
  const wrapper = mount(<Router><Signup toggle={toggle} handleChange={handleChange} /></Router>);
  wrapper.find('.signup-form').simulate('change');
});

// it('submit user details', () => {
//   const toggle = jest.fn();
//   const wrapper = mount(<Router><Signup toggle={toggle} onSubmit={jest.fn()} /></Router>);
//   wrapper.find('#username').value = 'testuser';
//   wrapper.find('#name').value = 'Test User';
//   wrapper.find('#email').value = 'testuser@test.co.ke';
//   wrapper.find('#password').value = 'password';
//   wrapper.find('#confirm_password').value = 'password';
//   fetchMock.post('/api/v1/auth/register', { msg: 'Successfully registered testuser' });
//   wrapper.find('.signup-form').simulate('submit');
//   fetchMock.called('/api/v1/auth/register');
// });
