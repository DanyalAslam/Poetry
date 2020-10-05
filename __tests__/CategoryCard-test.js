/**
 * @format
 */

import 'react-native';
import React from 'react';
import CategoryCard from '../src/Components/CategoryCard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<CategoryCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 