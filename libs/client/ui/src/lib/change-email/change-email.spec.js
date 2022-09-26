import React from 'react';
import { render } from '@testing-library/react-native';
import ChangeEmail from './change-email';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColour,
  selectUser,
  setEmail,
} from '@conversation-catcher/app/client/src/app/slices/user.slice';

import { screen, fireEvent } from '@testing-library/react-native';
/*import { QuestionsBoard } from '../QuestionsBoard';

test('form submits two answers', () => {
  const allQuestions = ['q1', 'q2'];
  const mockFn = jest.fn();

  render(<QuestionsBoard questions={allQuestions} onSubmit={mockFn} />);

  const answerInputs = screen.getAllByLabelText('answer input');

  fireEvent.changeText(answerInputs[0], 'a1');
  fireEvent.changeText(answerInputs[1], 'a2');
  fireEvent.press(screen.getByText('Submit'));

  expect(mockFn).toBeCalledWith({
    '1': { q: 'q1', a: 'a1' },
    '2': { q: 'q2', a: 'a2' },
  });
});

test('fire changeText event', () => {
  const colourState = useSelector(selectColour);
  const user = useSelector(selectUser);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [failedText, setFailedText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setNewEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const onEventMock = jest.fn();
  render(
    // MyComponent renders TextInput which has a placeholder 'Enter details'
    // and with `onChangeText` bound to handleChangeText
    <Provider store={store}>
      <ChangeEmail />
    </Provider>
  );

  fireEvent(screen.getByPlaceholderText('change'), 'onChangeText', 'ab');
  expect(onEventMock).toHaveBeenCalledWith('ab');
});*/

describe('ChangeEmail', () => {
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
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
    expect(true).toEqual(true);
  });
});

test('fire changeText event', () => {
  const colourState = useSelector(selectColour);
  const user = useSelector(selectUser);
  const [showMailHint, setShowMailHint] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [failedText, setFailedText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setNewEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const onEventMock = jest.fn();
  render(
    // MyComponent renders TextInput which has a placeholder 'Enter details'
    // and with `onChangeText` bound to handleChangeText
    <Provider store={store}>
      <ChangeEmail />
    </Provider>
  );

  fireEvent(screen.getByPlaceholderText('change'), 'onChangeText', 'ab');
  expect(onEventMock).toHaveBeenCalledWith('ab');
});