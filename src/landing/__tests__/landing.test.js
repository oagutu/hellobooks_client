import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import App from '..';

// Smoke test to check if landing page renders without throwing
it('renders landing page', () => {
  const wrapper = mount(<Router><App /></Router>);
  expect(wrapper.find('.login-pg-text')).toBeDefined();
});
