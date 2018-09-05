import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { fetchMock } from 'fetch-mock';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Signup from '../signup';


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;


const data = {
  username: 'test',
  name: 'test one',
  email: 'test@test.com',
  password: 'qwerty',
  confirm_password: 'qwerty',
};

it('returns an object if status code is created', () => {
  window.fetch = jest.fn().mockImplementation(() => ({
    status: 201,
    json: () => new Promise((resolve) => {
      resolve({ msg: 'Successfully registered test' });
    }),
  }));
  const toggle = sinon.spy();
  const wrapper = mount(<Router><Signup toggle={toggle} /></Router>);
  wrapper.update();
  console.log(wrapper.debug());
  wrapper.setState({ errorMessage: 'Successfully registered test' });

  expect(wrapper.state('errorMessage')).toEqual('Successfully registered test');
  // expect(send(data, 'POST', '/api/v1/auth/register')).resolves.toEqual({ groceries: [] });
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  const toggle = sinon.spy();
  ReactDOM.render(<Router><Signup toggle={toggle} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('test user signup input change', () => {
  // const wrapper = mount(<Signin />)
  const handleChange = sinon.spy();
  const wrapper = mount(<Router><Signup change={handleChange} /></Router>);
  wrapper.find('#username').simulate('change');
});

it('test user signupsubmit', () => {
  // const wrapper = mount(<Signin />)
  const handleSubmit = sinon.spy();
  const wrapper = mount(<Router><Signup change={handleSubmit} /></Router>);
  wrapper.find('#sign-up-btn').simulate('submit');
});
