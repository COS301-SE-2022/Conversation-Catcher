import React from 'react';
import { render } from '@testing-library/react-native';
import ColourPage from './colour-page';
import { Provider } from 'react-redux';
import reducer from 'apps/client/src/app/slices/colour.slice';
import { configureStore } from '@reduxjs/toolkit';

describe('ColourPage', () => {
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <ColourPage />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });
});
