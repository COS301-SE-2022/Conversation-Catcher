import React from 'react';
import { render } from '@testing-library/react-native';
import ColourPage from './colour-page';
describe('ColourPage', () => {
  it('should render successfully', () => {
    const { container } = render(<ColourPage />);
    expect(container).toBeTruthy();
  });
});
