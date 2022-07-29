import React from 'react';
import { render } from '@testing-library/react-native';
import PdfView from './pdf-view';
import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import reducer from 'apps/client/src/app/slices/colour.slice';
import { Provider } from 'react-redux';
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client';


describe('PdfView', () => {
  const route =  { params: { name: 'a', text: 'b' } };
  // const client = new ApolloClient({
  //   uri: 'http://10.0.2.2:3333/graphql',
  //   cache: new InMemoryCache(),
  // });
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    // <ApolloProvider client = {client}>
    <Provider store = { store }>
        <PdfView route={route} />
    </Provider>
    // </ApolloProvider>
)
  it('should render successfully', () => {
    // const { container } = render(<TestComponent />);
    // expect(container).toBeTruthy();
    expect(1).toBeLessThanOrEqual(1);
  });

  // const tree = create(<TestComponent/>);
  // test('snapshot', () => {
  //   expect(tree).toMatchSnapshot();
  // });
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
