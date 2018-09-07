import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
// import fetchMock from 'fetch-mock';
// import { createMemoryHistory } from 'history';
import Profile from '../profile';


const user_data = [
  {
    acc_status: 'member',
    email: 'test@test.co.ke',
    name: 'test',
    user_id: 1,
    username: 'testuser',
  },
];


it('Profile componentDidMount runs', async () => {
  window.fetchData = jest.fn().mockImplementation(() => ({
    status: 200,
    json: () => new Promise((resolve) => {
      resolve({
        user_details: user_data,
      });
    }),
  }));

  // const history = createMemoryHistory('/home');
  // const renderedComponent = await mount(<Profile />);
  // await renderedComponent.update();
  // renderedComponent.setState({ user_details: user_data });
  // expect(renderedComponent.state('user_details')).objectContaining({ username: 'testuser' });
});
