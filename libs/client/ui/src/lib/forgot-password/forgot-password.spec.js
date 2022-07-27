import React from 'react';
import { render } from '@testing-library/react-native';
import ForgotPassword from './forgot-password';
describe('ForgotPassword', () => {
  it('should render successfully', () => {
    const { container } = render(<ForgotPassword />);
    expect(container).toBeTruthy();
  });
});
