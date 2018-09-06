import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Profile from '../profile';
import EditUserForm from '../edit_user_profile';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;


it('renders user profile', () => {
  window.fetch = jest.fn().mockImplementation(() => ({
    status: 201,
    json: () => new Promise((resolve) => {
      resolve({
        msg: 'User obo2@ss.ff.ke successfully found',
        user_data: {
          acc_status: 'member',
          email: 'test@test.ff.ke',
          name: 'Test',
          user_id: 16,
          username: test,
        },
      });
    }),
  }));
  const wrapper = shallow(<Profile />);
  wrapper.update();

  // Chack if change password buttonrendered.
  expect(wrapper.find('.change-password')).toBeDefined();
});


it('renders change-password', () => {
  const toggle = sinon.spy();
  const wrapper = shallow(<EditUserForm toggleEditModal={toggle} />);

  // Chack if change password buttonrendered.
  expect(wrapper.find('.edit-user-profile')).toBeDefined();
});
