import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
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

xit('handleSubmit', () => {
  fetchMock.post('/api/v1/auth/users/status_change', 200);
  const updateOnEdit = jest.fn();
  const wrapper = shallow(
    <EditRole
      user="testuser"
      toggle={jest.fn()}
      updateOnEdit={updateOnEdit}
    />,
  );
  const handleSubmit = wrapper.instance().handleSubmit(new Event('submit'));
  expect(handleSubmit).toHaveBeenCalled();
});
