import React from 'react';
import { render } from '@testing-library/react-native';
import Settings from './settings';
describe('Settings', () => {
  it('should render successfully', () => {
    const { container } = render(<Settings />);
    expect(container).toBeTruthy();
  });
});
