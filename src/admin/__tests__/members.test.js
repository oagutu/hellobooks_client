import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
// import sinon from 'sinon';
import Members from '../members/members';
import MemberTable from '../members/member-table';
import MemberRow from '../members/member-row';
import EditRole from '../members/edit-role-form';


// Mock/Test members list
const members = [
  {
    acc_status: 'member',
    email: 'och@ss.ff.ke',
    name: 'John',
    user_id: 3,
    username: 'jays',
  },
  {
    acc_status: 'admin',
    email: 'obo@ss.ff.ke',
    name: 'Obola',
    user_id: 4,
    username: 'obi',
  },
];

// memberRow component
const m = members[0];
const memberRow = mount(
  <MemberRow
    value={m.user_id}
    username={m.username}
    name={m.name}
    email={m.email}
    acc_status={m.acc_status}
    updateOnEdit={jest.fn()}
  />,
);

it('renders main members component', () => {
  const wrapper = shallow(<Router><Members /></Router>);

  // Check if add-book main component rendered.
  expect(wrapper.find('.container')).toBeDefined();
});

it('renders members table component', () => {
  const wrapper = mount(
    <Router>
      <MemberTable members={members} updateOnEdit={jest.fn()} />
    </Router>,
  );
  expect(wrapper.find('.members-table')).toBeDefined();
  expect(wrapper.find('MemberRow')).toHaveLength(2);
});

it('renders edit member status modal', () => {
  expect(memberRow.find('Modal')).toBeDefined();
});

it('renders edit user role component', () => {
  const member = members[0];
  const wrapper = shallow(
    <Router>
      <EditRole user={member.username} updateOnEdit={jest.fn()} />
    </Router>,
  );
  expect(wrapper.find('.user-role')).toBeDefined();
});

it('handle edit role state change', () => {
  expect(memberRow.state().show).toEqual(false);
  memberRow.find('button').simulate('click');
  expect(memberRow.state().show).toEqual(true);
});
