import { selectPDFs} from './user.slice';

describe('user slice', () => {
  const testObj = {user:{email:"",colour:"",pdfs:[]}}
  it('returns an array',()=>{
    expect(selectPDFs(testObj).length).toEqual(0)
  });
})