import React from 'react';
import { render } from '@testing-library/react-native';
import Doc from './document';
describe('Document', () => {
  it('should render successfully', () => {
    const { container } = render(<Doc n={"Name"} t={"Text"}/>);
    expect(container).toBeTruthy();
  });
});
