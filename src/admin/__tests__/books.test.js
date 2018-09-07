import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import AddBook from '../books/add_book';

it('renders add book', () => {
  const wrapper = shallow(<AddBook />);

  // Chack if add-book main comonent rendered.
  expect(wrapper.find('.container')).toBeDefined();
});


it('check input values changing', () => {
  const handleChange = sinon.spy();
  const wrapper = mount(<Router><AddBook change={handleChange} /></Router>);
  wrapper.find('#author').simulate('change');
});
