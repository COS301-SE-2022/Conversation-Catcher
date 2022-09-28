import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Settings from './settings';
import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';

describe('Setup of settings', () => {
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
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const button = await screen.findByText('Change email');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Change email screen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
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
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const button = await screen.findByText('Change password');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Change password screen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const oldScreen = screen.queryByText('Settings');
    const button = await screen.findByText('Change password'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Change your password');

    expect(newScreen).toBeTruthy();
  });
});

