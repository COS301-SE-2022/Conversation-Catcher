import { render } from '@testing-library/react';
import PdfView from './pdf-view';
describe('PdfView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PdfView />);
    expect(baseElement).toBeTruthy();
  });
});
