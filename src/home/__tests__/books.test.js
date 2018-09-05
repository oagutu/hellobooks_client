import React from 'react';
import { shallow } from 'enzyme';
import Books from '../books/books';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const books = [
  {
    author: 'Mary changes',
    book_code: 978922433901,
    book_id: 15,
    ddc_code: '400',
    genre: 'non-fiction',
    sub_genre: 'NA',
    synopsis: 'Pef ohew ouweq...',
    title: 'Dreams on everything',
  },
  {
    author: 'Another one',
    book_code: 981654398561,
    book_id: 12,
    ddc_code: '400',
    genre: 'non-fiction',
    sub_genre: 'NA',
    synopsis: '',
    title: 'Notification check',
  },
];

it('renders books table', () => {
  const wrapper = shallow(<Books
    books={books}
    page_list={[1]}
  />);

  // Chack if pagination elements rendered.
  expect(wrapper.find('.pages-books')).toBeDefined();
  expect(wrapper.find('#1')).toHaveLength(1);
  // Check if books table rendered.
  expect(wrapper.find('.books-table')).toBeDefined();
  expect(wrapper.find('BookRow')).toHaveLength(2);
});
