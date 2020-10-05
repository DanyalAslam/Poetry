/**
 * @format
 */

import 'react-native';
import React from 'react';
import AnimatedWish from '../src/Components/AnimatedWish';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<AnimatedWish />).toJSON();
    expect(tree).toMatchSnapshot();
  });

