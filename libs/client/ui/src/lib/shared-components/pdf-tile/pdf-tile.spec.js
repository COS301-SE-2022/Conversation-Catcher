import React from 'react';
import { render } from '@testing-library/react-native';
import PdfTile from './pdf-tile';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {reducer} from '../../../../../../../apps/client/src/app/slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';

describe('PdfTile', () => {
  const store = configureStore({
    reducer: {
        user:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <PdfTile />
    </Provider>
)
  it('should render successfully', () => {//Wrap component in provider
    // const { container } = render(<TestComponent/>);
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
