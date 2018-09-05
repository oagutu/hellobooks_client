import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Home from '../index';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

it('renders without crashing', () => {
  const history = createMemoryHistory('/home');
  // const div = document.createElement('div');
  const wrapper = shallow(<Router><Home history={history} /></Router>);
  expect(wrapper.find('books')).toBeDefined();
});
