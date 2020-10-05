/**
 * @format
 */

import 'react-native';
import React from 'react';
import BottomSheetButtons from '../src/Components/BottomSheetButtons';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<BottomSheetButtons />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 