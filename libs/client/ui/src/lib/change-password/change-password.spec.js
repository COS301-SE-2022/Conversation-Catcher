import { render, screen, fireEvent } from '@testing-library/react-native';
import ChangePassword from './change-password';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

/*const onChangeMock = jest.fn();
const eventData = {
  nativeEvent: {
    password: '',
    oldPassword: '',
  },
};

//const colourState = useSelector(selectColour);
//const emailState = useSelector(selectEmail);

describe('ChangePassword', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <ChangePassword />
    </Provider>
)
  it('should render successfully', () => {
    // const { container } = render(<TestComponent />);
    // expect(container).toBeTruthy();
    expect(true).toEqual(true)
  });
});*/

describe('ChangePassword', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ChangePassword />
    </Provider>
  );

  render(TestComponent);

  //password
  const passwordInput = screen.getByPlaceholderText("*****************");
  expect(passwordInput).toBeTruthy();
  
  const textToEnterPassword = '123qwe123#';
  fireEvent.changeText(passwordInput, textToEnterPassword);

  // setCheckPassword
  const checkPasswordInput = screen.getByPlaceholderText("*****************");
  expect(checkPasswordInput).toBeTruthy();
  
  const textToEnterCheckPassword = '123qwe123#';
  fireEvent.changeText(checkPasswordInput, textToEnterCheckPassword);

  //password
  const oldPasswordInput = screen.getByPlaceholderText("*****************");
  expect(oldPasswordInput).toBeTruthy();
  
  const textToEnterOldPassword = '123qwe123#';
  fireEvent.changeText(oldPasswordInput, textToEnterOldPassword);

  // Submit
  fireEvent.press(screen.ByLabelText("Change password"));

  const emailState = store.getState().email;

  expect(emailState).toEqual('123qwe123#');
});