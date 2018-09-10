import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import Logs from '../logs/logs';
import UserLogTable from '../logs/user_logs';
import BookLogTable from '../logs/book_logs';

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
  const wrapper = mount(<Router><UserLogTable details={logs.users} count={1} /></Router>);
  expect(wrapper.find('logRow')).toHaveLength(1);
});

it('renders book logs', () => {
  const wrapper = mount(<Router><BookLogTable details={logs.books} count={1} /></Router>);
  expect(wrapper.find('logRow')).toHaveLength(1);
});


it('Logs componentDidMount runs', async () => {
  window.fetchData = jest.fn().mockImplementation(() => ({
    status: 200,
    json: () => new Promise((resolve) => {
      resolve({
        logs,
      });
    }),
  }));

  const history = createMemoryHistory('/borrow-history');
  const renderedComponent = await mount(<Router><Logs history={history} /></Router>);
  await renderedComponent.update();
  renderedComponent.setState({ book_logs: logs.books });
  expect(renderedComponent.state('book_logs').length).toEqual(1);
});
