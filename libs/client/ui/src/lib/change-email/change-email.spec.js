import React from 'react';
import { render } from '@testing-library/react-native';
import ChangeEmail from './change-email';
describe('ChangeEmail', () => {
  it('should render successfully', () => {
    const { container } = render(<ChangeEmail />);
    expect(container).toBeTruthy();
  });
});
