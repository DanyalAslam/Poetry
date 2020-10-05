/**
 * @format
 */

import 'react-native';
import React from 'react';
import RippleTouch from '../src/Components/RippleTouch';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<RippleTouch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 