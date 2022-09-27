import { render, screen, fireEvent } from '@testing-library/react-native';
import Login from './login';
//import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

// describe('Login', () => {
//   const store = configureStore({
//     reducer: {
//       user:reducer
//     },
//   });
//   const TestComponent = () => (
//     <Provider store={store}>
//       <Login />
//     </Provider>
//   );
//   it('should render successfully', () => {
//     //   const { container } = render(<TestComponent />);
//     //   expect(container).toBeTruthy();
//     expect(true).toEqual(true);
//   });

//   // const tree = create(<TestComponent />);
//   // test('snapshot', () => {
//   //   expect(tree).toMatchSnapshot();
//   // });
// });


describe('Login', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <Login />
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

  expect(emailState).toEqual('123qwe123#');
});