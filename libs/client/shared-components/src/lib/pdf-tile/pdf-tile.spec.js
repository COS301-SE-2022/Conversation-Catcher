import React from 'react';
import { render } from '@testing-library/react-native';
import PdfTile from './pdf-tile';
describe('PdfTile', () => {
  it('should render successfully', () => {
    const { container } = render(<PdfTile />);
    expect(container).toBeTruthy();
  });
});
