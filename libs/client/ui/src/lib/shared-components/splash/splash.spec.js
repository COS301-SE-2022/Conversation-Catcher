import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './splash';
describe('Splash', () => {
  it('should render successfully', () => {
    const { container } = render(<Splash />);
    expect(container).toBeTruthy();
  });
});
