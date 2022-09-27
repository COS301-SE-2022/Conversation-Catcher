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

  render(TestComponent);

  //new email
  const emailInput = screen.getByPlaceholderText("johnsmith@gmail.com");
  expect(emailInput).toBeTruthy();
  
  const textToEnterEmail = 'random@random.com';
  fireEvent.changeText(emailInput, textToEnterEmail);

  //password
  const passwordInput = screen.getByPlaceholderText("*******************");
  expect(passwordInput).toBeTruthy();
  
  const textToEnterPassword = '123qwe123#';
  fireEvent.changeText(passwordInput, textToEnterPassword);

  // Submit
  fireEvent.press(screen.ByLabelText("Log in"));
  
  it('test email', () => {
    const emailState = store.getState().email;
    expect(emailState).toEqual('random@random.com');
  });

  it('test password', () => {
    const passwordState = store.getState().password;
    expect(passwordState).toEqual('123qwe123#');
  });
});
