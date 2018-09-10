import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import BorrowRow from '../borrow-row';


const history = createMemoryHistory('/borrow-history');

it('handleReturn', () => {
//   const handleReturn = jest.fn();
  const wrapper = mount(
    <Router>
      <BorrowRow
        value={1}
        book_id={1}
        title="Book Title"
        borrow_date="Mon, 27 Aug 2018 15:05:00 GMT"
        due_date="Mon, 10 Sep 2018 12:15:40 GMT"
        status="valid"
        history={history}
        updateStateOnReturn={jest.fn()}
      />
    </Router>,
  );
  expect(wrapper.find('.return_book_modal').props().isOpen).toEqual(false);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('Modal.return_book_modal').props().isOpen).toEqual(true);
});
