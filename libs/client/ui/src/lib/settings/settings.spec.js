import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Settings from './settings';
// import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from '../AppNavigator';

describe('Setup of settings and navigation', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <Settings />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(TestComponent);
    expect(container).toBeTruthy();
  });

  render(TestComponent);

  // const tree = create(<Settings />);
  // test('snapshot', () => {
  //   expect(tree).toMatchSnapshot();
  // });
  
  test('screen contains a button linking to the Change email page', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Change email');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Change email screen', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Settings');
    const button = await screen.findByText('Change email'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Change your email');

    expect(newScreen).toBeTruthy();
  });

  test('screen contains a button linking to the Change password page', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Change password');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Change password screen', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Settings');
    const button = await screen.findByText('Change password'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Change your password');

    expect(newScreen).toBeTruthy();
  });

  test('screen contains a button linking to the Change colour page', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Change colour');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Change colour screen', async () => {
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Settings');
    const button = await screen.findByText('Change colour'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Change colour');

    expect(newScreen).toBeTruthy();
  });

  test('Test sign out', async () => {
    const store = configureStore({
      reducer: {
        user:reducer
      },
    });
    const component = (
      <Provider store = { store }>
        <Settings />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Settings');
    const button = await screen.findByText('Log out'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Log in to your account');

    expect(newScreen).toBeTruthy();
  
    const userState = store.getState();
  
    expect(userState).toEqual({});
  });
});

