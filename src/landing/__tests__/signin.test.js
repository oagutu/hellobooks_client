import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
// import fetchMock from 'fetch-mock';
import Signin from '../signin';

it('renders without crashing', () => {
  const wrapper = shallow(<Router><Signin /></Router>);
  expect(wrapper.find('.login-form')).toBeDefined();
});

it('check input change on user action', () => {
  const handleChange = jest.fn();
  const wrapper = mount(<Router><Signin handleChange={handleChange} /></Router>);
  wrapper.find('#username_login').simulate('change');
});

it('toggles signup modals', () => {
  const wrapper = mount(<Router><Signin /></Router>);
  expect(wrapper.find('.signup-modal').props().isOpen).toEqual(false);
  wrapper.find('Button.signup-btn').simulate('click');
  expect(wrapper.find('Modal.signup-modal').props().isOpen).toEqual(true);
});
