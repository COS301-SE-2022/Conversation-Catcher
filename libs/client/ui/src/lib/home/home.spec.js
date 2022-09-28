/*import React from 'react';
import { render } from '@testing-library/react-native';
import Home from './home';
import { create } from 'react-test-renderer';
// import fetch from 'cross-fetch';
const client = jest.fn();
describe('Home', () => {
  //   const client = new ApolloClient({
  //     uri: 'http://localhost:3333/graphql',
  //     link: new HttpLink({ uri: '/graphql', fetch }),
  //     cache: new InMemoryCache(),
  //   });
  it('should render successfully', () => {
    //   const { container } = render(<Home />);
    //   expect(container).toBeTruthy();
    expect(true).toEqual(true);
  });

  // const tree = create(<Home />);
  // test('snapshot', () => {
  //   expect(tree).toMatchSnapshot();
  // });
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
*/

import * as React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent } from '@testing-library/react-native';
//import AppNavigator from '../AppNavigator';
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import Home from './home';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing react navigation', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    }
  })
  test('screen contains a button linking to the ViewAll page', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('My PDFs');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the ViewAll screen', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Recents');
    const button = await screen.findByText('My PDFs');

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByPlaceholderText('Search');

    expect(newScreen).toBeTruthy();
  });

  test('screen contains a button linking to the Groups page', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Groups');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Groups screen', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Recents');
    const button = await screen.findByText('Groups');

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Groups');

    expect(newScreen).toBeTruthy();
  });

  test('screen contains a button linking to the Settings page', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const button = await screen.findByText('Settings');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the Settings screen', async () => {
    const component = (
      <Provider store = { store }>
        <Home />
    </Provider>
    );

    render(component);
    const oldScreen = screen.queryByText('Recents');
    const button = await screen.findByText('Settings'); // come back to

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByText('Settings');

    expect(newScreen).toBeTruthy();
  });
});
