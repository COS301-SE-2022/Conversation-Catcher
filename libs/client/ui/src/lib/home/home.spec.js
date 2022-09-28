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
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AppNavigator from '../AppNavigator';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Testing react navigation', () => {
  // test('page contains the header and 10 items', async () => {
  //   const component = (
  //     <NavigationContainer>
  //       <AppNavigator />
  //     </NavigationContainer>
  //   );

  //   render(component);

  //   const header = await screen.findByText('List of numbers from 1 to 20');
  //   const items = await screen.findAllByText(/Item number/);

  //   expect(header).toBeTruthy();
  //   expect(items.length).toBe(10);
  // });

  test('screen contains a button linking to the ViewAll page', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const button = await screen.findByText('My PDFs');

    expect(button).toBeTruthy();
  });

  test('clicking on the button takes you to the ViewAll screen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const oldScreen = screen.queryByText('Search');
    const button = await screen.findByText('My PDFs');

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await screen.queryByPlaceholderText('Recents');

    expect(newScreen).toBeTruthy();
  });
});
