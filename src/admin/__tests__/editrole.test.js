import React from 'react';
import { shallow } from 'enzyme';
import EditRole from '../members/edit-role-form';

it('renders edit user role modal', () => {
  const wrapper = shallow(
    <EditRole
      user="testuser"
      toggle={jest.fn()}
      updateOnEdit={jest.fn()}
    />,
  );
  expect(wrapper.find('.edit-role-form')).toBeDefined();
});
