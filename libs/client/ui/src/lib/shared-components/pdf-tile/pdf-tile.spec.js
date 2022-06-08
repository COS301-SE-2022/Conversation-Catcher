import React from 'react';
import { render } from '@testing-library/react-native';
import PdfTile from './pdf-tile';
import { create } from 'react-test-renderer';
describe('PdfTile', () => {
  it('should render successfully', () => {
    const { container } = render(<PdfTile />);
    expect(container).toBeTruthy();
  });

  /*
  const tree = create(<PdfTile />);
  test('snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  */
});

// describe('The actions that occur on button press', () => {
//   it('should display the available colours')
// });
