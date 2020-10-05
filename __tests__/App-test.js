/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeEach(() => {
  jest.useFakeTimers();
})

it('renders correctly', async () => {
  renderer.create(<App />);
});

// test('renders correctly',async () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
