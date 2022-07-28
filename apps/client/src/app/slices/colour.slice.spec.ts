import { selectColour, getColour } from './colour.slice';
import { useSelector } from 'react-redux';

describe('colour reducer', () => {
  it('retrieves stored colour',()=>{
    expect(getColour()).toBeCalled()
  }),
  it('returns a string containing #',() =>{
    expect(getColour()).toContain("#")
  })
});
