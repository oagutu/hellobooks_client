import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Profile from '../profile';
import EditUserForm from '../edit_user_profile';


it('renders user profile', () => {
  const wrapper = shallow(<Profile />);

  // Chack if change password buttonrendered.
  expect(wrapper.find('.change-password')).toBeDefined();
});


it('renders change-password', () => {
  const toggle = sinon.spy();
  const wrapper = shallow(<EditUserForm toggleEditModal={toggle} />);

  // Chack if change password buttonrendered.
  expect(wrapper.find('.edit-user-profile')).toBeDefined();
});
