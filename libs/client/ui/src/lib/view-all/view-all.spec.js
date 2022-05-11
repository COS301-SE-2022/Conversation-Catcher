import React from 'react';
import { render } from '@testing-library/react-native';
import ViewAll from './view-all';
describe('ViewAll', () => {
  it('should render successfully', () => {
    const { container } = render(<ViewAll />);
    expect(container).toBeTruthy();
  });
});
