import React from 'react';
import { render } from '@testing-library/react-native';
import Login from './login';
import { create } from 'react-test-renderer';

describe('Login', () => {
  it('should render successfully', () => {
    const { container } = render(<Login />);
    expect(container).toBeTruthy();
  });

  /*
  const tree = create(<Login />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  */
});
