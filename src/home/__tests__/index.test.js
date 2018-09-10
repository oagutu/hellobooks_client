import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import Home from '../index';

const { books } = global;

it('renders without crashing', () => {
  const history = createMemoryHistory('/home');
  // const div = document.createElement('div');
  const wrapper = shallow(<Router><Home history={history} /></Router>);
  expect(wrapper.find('books')).toBeDefined();
});

it('componentDidMount runs', async () => {
  window.fetchData = jest.fn().mockImplementation(() => ({
    status: 200,
    json: () => new Promise((resolve) => {
      resolve({
        results: { books },
      });
    }),
  }));

  const history = createMemoryHistory('/home');
  const renderedComponent = await mount(<Home history={history} />);
  await renderedComponent.update();
  renderedComponent.setState({ results: books });
  expect(renderedComponent.state('results').length).toEqual(2);
});
