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

it('renders main members component', () => {
  const wrapper = shallow(<Router><Members /></Router>);

  // Chack if add-book main component rendered.
  expect(wrapper.find('.container')).toBeDefined();
});

it('renders members table component', () => {
  const wrapper = mount(<Router><MemberTable members={members} /></Router>);
  expect(wrapper.find('.members-table')).toBeDefined();
  expect(wrapper.find('MemberRow')).toHaveLength(2);
});

it('renders edit member status modal', () => {
  const m = members[0];
  const wrapper = mount(
    <Router>
      <MemberRow
        value={m.user_id}
        username={m.username}
        name={m.name}
        email={m.email}
        acc_status={m.acc_status}
      />
    </Router>,
  );
  expect(wrapper.find('Modal')).toBeDefined();
});

it('renders edit user role component', () => {
  const m = members[0];
  const wrapper = shallow(
    <Router>
      <EditRole user={m.username} />
    </Router>,
  );
  expect(wrapper.find('.user-role')).toBeDefined();
});
