import React from 'react';
import { render } from '@testing-library/react-native';
import Register from './register';
describe('Register', () => {
  it('should render successfully', () => {
    const { container } = render(<Register />);
    expect(container).toBeTruthy();
  });
});
