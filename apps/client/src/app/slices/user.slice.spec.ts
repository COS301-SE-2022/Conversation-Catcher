import { selectPDFs} from './user.slice';

describe('user slice', () => {
  it('returns an array',()=>{
    expect(selectPDFs({user:{email:"",colour:"",pdfs:[]}}).length).toEqual(0)
  });
})