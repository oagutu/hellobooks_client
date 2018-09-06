import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
// import sinon from 'sinon';
import History from '../history';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

window.fetch = jest.fn()
  .mockImplementationOnce(() => ({
    status: 200,
    json: () => new Promise((resolve) => {
      resolve([
        {
          book_id: 1,
          book_title: 'Kitabu changu',
          borrow_date: 'Mon, 27 Aug 2018 15:05:00 GMT',
          borrow_id: 2,
          due_date: 'Mon, 10 Sep 2018 12:15:40 GMT',
          fee_owed: 0,
          return_date: '',
          status: 'valid',
        },
      ]);
    }),
  }))
  .mockImplementationOnce(() => ({
    status: 500,
  }));

it('renders user history', () => {
  const wrapper = mount(<Router><History /></Router>);
  wrapper.update();

  // Chack if unreturned books tab rendered.
  expect(wrapper.find('.unreturned')).toBeDefined();
  expect(wrapper.state('borrow_details').length).toEqual(1);
});
