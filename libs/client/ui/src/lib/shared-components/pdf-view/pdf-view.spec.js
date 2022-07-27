import React from 'react';
import { render } from '@testing-library/react-native';
import PdfView from './pdf-view';
import { create } from 'react-test-renderer';
describe('PdfView', () => {
  it('should render successfully', () => {
    const { container } = render(<PdfView />);
    expect(container).toBeTruthy();
  });

  
  const tree = create(<PdfView />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
