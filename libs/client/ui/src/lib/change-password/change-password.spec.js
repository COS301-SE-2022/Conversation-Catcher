import React from 'react';
import { render } from '@testing-library/react-native';
import ChangePassword from './change-password';
describe('ChangePassword', () => {
  it('should render successfully', () => {
    const { container } = render(<ChangePassword />);
    expect(container).toBeTruthy();
  });
});
