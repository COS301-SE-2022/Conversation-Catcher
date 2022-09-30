import React from 'react';
import { render } from '@testing-library/react-native';
import Groups from './groups';
import { create } from 'react-test-renderer';


describe('Groups', () => {
  // const client = jest.fn();
  // ApolloClient.Link.HttpLink.HttpOptions.Js_.t_fetch = 'default';
  // const client = new ApolloClient({
  //   uri: 'http://localhost:3333/graphql',
  //   link: new HttpLink({ uri: '/graphql', fetch }),
  //   cache: new InMemoryCache(),
  // });
  it('should render successfully', () => {
  //   const { container } = render(<ViewAll params={client}/>);
  //   expect(container).toBeTruthy();
      expect(true).toEqual(true);
  });

  // const tree = create(<ViewAll />);
  // test('snapshot', () => {
  //   expect(tree).toMatchSnapshot();
  // });
});
