import { selectColour} from './colour.slice';

describe('colour reducer', () => {
  it('should return #ffffff',()=>{
    expect(selectColour({colour:'#ffffff'})).toContain('#ffffff')
  })
});
