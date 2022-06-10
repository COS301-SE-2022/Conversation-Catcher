import React from 'react';
import { render } from '@testing-library/react-native';
import ViewAll  from './view-all';
import { create } from 'react-test-renderer';
describe('ViewAll', () => {
  it('should render successfully', () => {
    const { container } = render(<ViewAll />);
    expect(container).toBeTruthy();
  });

  const tree = create(<ViewAll />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});