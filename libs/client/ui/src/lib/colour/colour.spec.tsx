import React from 'react';
import { render } from '@testing-library/react-native';

import Colour from './colour';

describe('Colour', () => {
  it('Should not be empty',()=>{
      expect(Colour.state).toBeDefined();
  })
});
