import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ViewAll from './view-all';
import { create } from 'react-test-renderer';
//import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

describe('ViewAll', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ViewAll />
    </Provider>
  );

  it('View all should render', () => {
    const { container } = render(TestComponent);
    expect(container).toBeTruthy();
    expect(true).toEqual(true);
  });

  render(TestComponent);

  // search bar

  //order by

  //modal button

  //rename
  //rename

  //delete

  //password
  
});
