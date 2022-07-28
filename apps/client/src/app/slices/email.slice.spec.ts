import { selectEmail } from './email.slice';

describe('email reducer',() => {
  it('should return test@domain.com',()=>{
    expect(selectEmail({email:'test@domain.com'})).toContain('test@domain.com')
  })
})
