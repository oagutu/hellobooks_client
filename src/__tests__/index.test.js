import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from '../index';

// it('renders main component', () => {
//   const wrapper = shallow(<App />);
//   const header = <h1>Your Library Solution</h1>;
//   expect(wrapper.contains(header)).toEqual(true);
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


it('renders main component', () => {
  const wrapper = mount(<App />);
  console.log(wrapper.debug());
  expect(wrapper.find('.main-container')).toBeDefined();
});
