import React from 'react';
import { render } from '@testing-library/react-native';
import Settings from './settings';
import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../../../../../apps/client/src/app/slices/colour.slice';
import { Provider } from 'react-redux';

describe('Setup of settings', () => {
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <Settings />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });


  // const tree = create(<Settings />);
  // test('snapshot', () => {
  //   expect(tree).toMatchSnapshot();
  // });

});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
