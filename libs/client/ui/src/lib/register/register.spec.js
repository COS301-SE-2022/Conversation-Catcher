import { render, screen, fireEvent } from '@testing-library/react-native';
import Register from './register';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

// describe('Register', () => {
//   const store = configureStore({
//     reducer: {
//       user: reducer,
//     },
//   });
//   const TestComponent = () => (
//     <Provider store={store}>
//       <Register />
//     </Provider>
//   );
//   it('should render successfully', () => {
//     // const { container } = render(<TestComponent />);
//     // expect(container).toBeTruthy();
//     expect(true).toEqual(true);
//   });
// });

describe('Register', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <Register />
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
  fireEvent.press(screen.ByLabelText("Register"));
  
  it('test email', () => {
    const emailState = store.getState().email;
    expect(emailState).toEqual('random@random.com');
  });

  it('test password', () => {
    const passwordState = store.getState().password;
    expect(passwordState).toEqual('123qwe123#');
  });

  
});

describe('Testing react navigation', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <Register />
    </Provider>
  );

  render(TestComponent);
  test('screen contains a button linking to the Login page', async () => {
    const component = (
      <Provider store = { store }>
        <Register />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Already a user?');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Login screen', async () => {
    const component = (
      <Provider store = { store }>
        <Register />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Create new account');
    const button = await screen.findByText('Already a user?');

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByPlaceholderText('Log in to your account');

    expect(newScreen).toBeTruthy();
  });
});