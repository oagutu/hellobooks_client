import React from 'react';
import { shallow } from 'enzyme';
import Editprof from '../edit_user_profile';

it('renders change password form', () => {
  const wrapper = shallow(
    <Editprof
      name="testuser"
      username="testuser"
      email="testuser@email.com"
      toggleEditModal={jest.fn()}
    />,
  );

  expect(wrapper.find('.edit-user-profile')).toBeDefined();
});
