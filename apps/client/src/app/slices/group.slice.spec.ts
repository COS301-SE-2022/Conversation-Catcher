import { selectGroups,addGroup,removeGroup} from './group.slice';

describe('group reducer', () => {
  it('returns an array',()=>{
    expect(selectGroups({group:[]}).length).toEqual(0)
  });
  it('adds a group',()=>{
    expect(addGroup({name:"Bob"}).payload.name).toContain("Bob")
  });
})