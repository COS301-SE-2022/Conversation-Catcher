import React from 'react';
import { render } from '@testing-library/react-native';
import Settings from './settings';
import { create } from 'react-test-renderer';
describe('Setup of settings', () => {
  it('should render successfully', () => {
    const { container } = render(<Settings />);
    expect(container).toBeTruthy();
  });

  const tree = create(<Settings />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
