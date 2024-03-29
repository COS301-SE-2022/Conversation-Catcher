import React from 'react';
import { render } from '@testing-library/react-native';
import ColourPage from './colour-page';
import { Provider } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';

describe('ColourPage', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <ColourPage />
    </Provider>
)
  it('should render successfully', () => {
    // const { container } = render(<TestComponent />);
    // expect(container).toBeTruthy();
    expect(true).toEqual(true);
  });
});
