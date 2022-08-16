import React from 'react';
import { render } from '@testing-library/react-native';
import PdfDisplay from './pdf-display';
describe('PdfDisplay', () => {
  it('should render successfully', () => {
    const { container } = render(<PdfDisplay />);
    expect(container).toBeTruthy();
  });
});
