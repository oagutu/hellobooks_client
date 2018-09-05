import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
// import sinon from 'sinon';
import Logs from '../logs/logs';
import UserLogTable from '../logs/user_logs';
import BookLogTable from '../logs/book_logs';


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const logs = {
  users: [{
    action: 'INSERT',
    log_id: 1,
    success: true,
    timestamp: 'Tue, 24 Jul 2018 17:16:00 GMT',
    user_id: 1,
  }],
  books: [{
    action: 'INSERT',
    log_id: 1,
    book_id: 1,
    success: true,
    timestamp: 'Tue, 14 Aug 2018 15:12:00 GMT',
  }],
};

it('renders action logs', () => {
  const history = createMemoryHistory('/action-logs');
  const wrapper = shallow(<Router><Logs history={history} /></Router>);
  expect(wrapper.find('.log-body')).toBeDefined();
});


it('renders user logs', () => {
  const wrapper = mount(<Router><UserLogTable details={logs.users} /></Router>);
  expect(wrapper.find('logRow')).toHaveLength(1);
});

it('renders book logs', () => {
  const wrapper = mount(<Router><BookLogTable details={logs.books} /></Router>);
  expect(wrapper.find('logRow')).toHaveLength(1);
});
