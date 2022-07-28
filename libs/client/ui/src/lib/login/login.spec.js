import React from 'react';
import { render } from '@testing-library/react-native';
import Login from './login';
import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from 'apps/client/src/app/slices/colour.slice';
import { Provider } from 'react-redux';

describe('Login', () => {
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <Login />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });

  
  const tree = create(<TestComponent />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});
