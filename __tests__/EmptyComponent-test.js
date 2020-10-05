/**
 * @format
 */

import 'react-native';
import React from 'react';
import EmptyComponent from '../src/Components/EmptyComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeEach(() => {
  jest.useFakeTimers();
})

test('renders correctly', async () => {
    const tree = renderer.create(<EmptyComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 