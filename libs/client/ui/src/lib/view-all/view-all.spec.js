import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ViewAll from './view-all';
import { create } from 'react-test-renderer';
//import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from '../../../../../../apps/client/src/app/slices/user.slice';
import { Provider } from 'react-redux';

// describe('ViewAll', () => {
//   // const client = jest.fn();
//   // ApolloClient.Link.HttpLink.HttpOptions.Js_.t_fetch = 'default';
//   // const client = new ApolloClient({
//   //   uri: 'http://localhost:3333/graphql',
//   //   link: new HttpLink({ uri: '/graphql', fetch }),
//   //   cache: new InMemoryCache(),
//   // });
//   it('should render successfully', () => {
//   //   const { container } = render(<ViewAll params={client}/>);
//   //   expect(container).toBeTruthy();
//       expect(true).toEqual(true);
//   });

//   // const tree = create(<ViewAll />);
//   // test('snapshot', () => {
//   //   expect(tree).toMatchSnapshot();
//   // });
// });

describe('ViewAll', () => {
  const store = configureStore({
    reducer: {
      user:reducer
    },
  });
  const TestComponent = () => (
    <Provider store={store}>
      <ViewAll />
    </Provider>
  );

  it('View all should render', () => {
    const { container } = render(TestComponent);
    expect(container).toBeTruthy();
  });

  render(TestComponent);

  // search bar

  //order by

  //modal button

  //rename
  //rename

  //delete

  //password
  
});
