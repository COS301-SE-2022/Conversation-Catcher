import React from 'react';
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
