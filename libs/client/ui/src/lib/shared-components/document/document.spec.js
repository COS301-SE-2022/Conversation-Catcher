import React from 'react';
import { render } from '@testing-library/react-native';
import Document from './document';
describe('Document', () => {
  it('should render successfully', () => {
    const { container } = render(<Document />);
    expect(container).toBeTruthy();
  });
});
