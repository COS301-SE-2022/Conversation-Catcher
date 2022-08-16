import React from 'react';
import { render } from '@testing-library/react-native';
import LocalPdfsAccess from './local-pdfs-access';
describe('LocalPdfsAccess', () => {
  it('should render successfully', () => {
    const { container } = render(<LocalPdfsAccess />);
    expect(container).toBeTruthy();
  });
});
