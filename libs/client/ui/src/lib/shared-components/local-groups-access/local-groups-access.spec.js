import LocalGroupsAccess from './local-groups-access';
describe('LocalGroupsAccess', () => {
  it('should be created successfully', () => {
    LocalGroupsAccess.addGroup({ name: 'Ben' });
    expect(LocalGroupsAccess.getLength()).toEqual(1);
  });
});
