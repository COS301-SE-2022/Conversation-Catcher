import React from 'react';
import { render } from '@testing-library/react-native';
import PdfView from './pdf-view';
import { create } from 'react-test-renderer';
describe('PdfView', () => {
  const route =  { params: { name: 'a', text: 'b' } };
  it('should render successfully', () => {
    const { container } = render(<PdfView route={route} />);
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
