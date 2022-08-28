export class getGroupPdfsQuery {
  constructor(public readonly group_id?: string) {}
}

export class getGroupsForQuery {
  constructor(public readonly email?: string) {}
}

export class getAllGroupsQuery {}
