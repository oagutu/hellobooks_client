import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import BookRow from '../books/bookrow';

const book = {
  author: 'Mary changes',
  book_code: 978922433901,
  book_id: 15,
  ddc_code: '400',
  genre: 'non-fiction',
  sub_genre: 'NA',
  synopsis: 'Pef ohew ouweq...',
  title: 'Dreams on everything',
};

// bookRow element wrapped in Router to allow for use of withRouter
const wrapper = shallow(
  <Router>
    <BookRow
      key={1}
      value={1}
      title={book.title}
      author={book.author}
      book_code={book.book_code}
      ddc_code={book.ddc_code}
      genre={book.genre}
      sub_genre={book.sub_genre}
      synopsis={book.synopsis}
      isAdmin
    />
  </Router>,
);

it('renders book row', () => {
  // Chack if book row buttons/icons and corresponding modals rendered.
  expect(wrapper.find('.borrow-book-btn')).toBeDefined();
  expect(wrapper.find('.delete_book_modal')).toBeDefined();
});
