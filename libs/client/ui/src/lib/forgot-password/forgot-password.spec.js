import { render, screen, fireEvent } from '@testing-library/react-native';
import ForgotPassword from './forgot-password';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

// describe('ForgotPassword', () => {
//   const store = configureStore({
//     reducer: {
//       user:reducer
//     }
//   })
//   const TestComponent = () => (
//     <Provider store = { store }>
//         <ForgotPassword />
//     </Provider>
// )
//   it('should render successfully', () => {
//     // const { container } = render(<TestComponent />);
//     // expect(container).toBeTruthy();
//     expect(true).toEqual(true);
//   });
// });

describe('ForgotPassword', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ForgotPassword />
    </Provider>
  );

  render(TestComponent);

  //new email
  const newEmailInput = screen.getByPlaceholderText("johnsmith@gmail.com");
  expect(newEmailInput).toBeTruthy();
  
  const textToEnterNewEmail = 'random@random.com';
  fireEvent.changeText(newEmailInput, textToEnterNewEmail);

  // Submit
  fireEvent.press(screen.ByLabelText("Send reset email"));

  const emailState = store.getState().email;

  expect(emailState).toEqual('random@random.com');
});