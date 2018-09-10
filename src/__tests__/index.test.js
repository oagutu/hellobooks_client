import React from 'react';
import { mount } from 'enzyme';
import Main from '../App';


it('renders main app without crashing', () => {
  const wrapper = mount(<Main />);
  expect(wrapper.find('.main-container')).toBeDefined();
});
