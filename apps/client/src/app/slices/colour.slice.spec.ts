import { selectColour } from './colour.slice';
import { useSelector } from 'react-redux';

describe('colour reducer', () => {
  it('retrieves stored colour',()=>{
    expect(useSelector(selectColour)).toHaveReturned()
  })
});
