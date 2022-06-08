import React from 'react';
import { render } from '@testing-library/react-native';
import Home from './home';
import { create } from 'react-test-renderer';
describe('Home', () => {
  it('should render successfully', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });

  
  const tree = create(<Home />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
