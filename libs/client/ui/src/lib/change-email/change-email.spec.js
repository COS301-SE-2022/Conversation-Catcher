import { render, screen, fireEvent } from '@testing-library/react-native';
import ChangeEmail from './change-email';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';
// yarn nx run change-email:test

describe('check if ChangeEmail renders correctly', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ChangeEmail />
    </Provider>
  );
  it('should render successfully', () => {
    const { container } = render(TestComponent);
    expect(container).toBeTruthy();
  });
});

test('check changing of email works', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ChangeEmail />
    </Provider>
  );

  render(TestComponent);

  //new email
  const newEmailInput = screen.getByPlaceholderText("johnsmith@gmail.com");
  expect(newEmailInput).toBeTruthy();
  
  const textToEnterNewEmail = 'random@random.com';
  fireEvent.changeText(newEmailInput, textToEnterNewEmail);

  // setCheckEmail
  const checkEmailInput = screen.getByPlaceholderText("johnsmith@gmail.com");
  expect(checkEmailInput).toBeTruthy();
  
  const textToEnterCheckEmail = 'random@random.com';
  fireEvent.changeText(newEmailInput, textToEnterCheckEmail);

  // setPassword
  const passwordInput = screen.getByPlaceholderText("*********");
  expect(passwordInput).toBeTruthy();
  
  const textToEnterPassword = '123qwe123#';
  fireEvent.changeText(passwordInput, textToEnterPassword);

  // Submit
  fireEvent.press(screen.ByLabelText('Change email'));

  const emailState = store.getState().email;

  expect(emailState).toEqual('random@random.com');
});