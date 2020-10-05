/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeCategoryCard from '../src/Components/HomeCategoryCard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<HomeCategoryCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 