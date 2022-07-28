import React from 'react';
import { render } from '@testing-library/react-native';
import ForgotPassword from './forgot-password';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from 'apps/client/src/app/slices/colour.slice';
import { Provider } from 'react-redux';

describe('ForgotPassword', () => {
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <ForgotPassword />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });
});
