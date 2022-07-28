import React from 'react';
import { render } from '@testing-library/react-native';
import PdfTile from './pdf-tile';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import reducer from '../../../../../../../apps/client/src/app/slices/colour.slice';
import { configureStore } from '@reduxjs/toolkit';

describe('PdfTile', () => {
  it('should render successfully', () => {//Wrap component in provider
    const store = configureStore({
      reducer: {
          colour:reducer
      }
    })
    const TestComponent = () => (
      <Provider store = { store }>
          <PdfTile />
      </Provider>
  )
    const { container } = render(<TestComponent/>);
    expect(container).toBeTruthy();
  });

  
  const tree = create(<PdfTile />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
