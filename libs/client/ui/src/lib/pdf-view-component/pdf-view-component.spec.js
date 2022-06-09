import { render } from '@testing-library/react';
import PdfViewComponent from './pdf-view-component';
describe('PdfViewComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PdfViewComponent />);
    expect(baseElement).toBeTruthy();
  });
});
