import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import History from '../history';

const response = [
  {
    book_id: 1,
    book_title: 'Kitabu changu',
    borrow_date: 'Mon, 27 Aug 2018 15:05:00 GMT',
    borrow_id: 2,
    due_date: 'Mon, 10 Sep 2018 12:15:40 GMT',
    fee_owed: 0,
    return_date: null,
    status: 'valid',
  },
];


it('componentDidMount runs', async () => {
  window.fetchData = jest.fn().mockImplementation(() => ({
    status: 200,
    json: () => new Promise((resolve) => {
      resolve({
        response,
      });
    }),
  }));

  const history = createMemoryHistory('/borrow-history');
  const renderedComponent = await mount(<Router><History history={history} /></Router>);
  await renderedComponent.update();
  renderedComponent.setState({ borrow_details: response });
  expect(renderedComponent.state('borrow_details').length).toEqual(1);
});
