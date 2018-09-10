import React from 'react';
import { shallow } from 'enzyme';
import Books from '../books/books';

const { books } = global;

it('renders books table', () => {
  const wrapper = shallow(<Books
    books={books}
    page_list={[1]}
  />);

  // Chack if pagination elements rendered.
  expect(wrapper.find('.pages-books')).toBeDefined();
  expect(wrapper.find('.books-table')).toBeDefined();
});
