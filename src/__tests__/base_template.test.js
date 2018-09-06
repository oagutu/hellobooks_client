import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import Navbar from '../BaseTemplate';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;


it('renders landing page navbar', () => {
  const wrapper = mount(<Router><Navbar /></Router>);
  expect(wrapper.find('#navbar-landing')).toBeDefined();
});

it('renders authenticated user navbar', () => {
  const wrapper = mount(<Router><Navbar /></Router>);
  expect(wrapper.find('#navbar-authenticated')).toBeDefined();
});
