import React from 'react';
import { render } from '@testing-library/react-native';
import PdfView from './pdf-view';
import { create } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../../../../../apps/client/src/app/slices/colour.slice';

describe('PdfView', () => {
  const route =  { params: { name: 'a', text: 'b' } };
  const store = configureStore({
    reducer: {
        colour:reducer
    }
  })
  const TestComponent = () => (
    <Provider store = { store }>
        <PdfView route={route} />
    </Provider>
)
  it('should render successfully', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });

  const tree = create(<PdfView route={route} />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
