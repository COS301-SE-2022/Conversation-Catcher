export class getGroupPdfsQuery {
  constructor(public readonly groupName?: string) {}
}

export class getGroupsForQuery {
  constructor(public readonly email?: string) {}
}

export class getAllGroupsQuery {}
