export class requestJoinCommand {
  constructor(
    public readonly email: string,
    public readonly group_id: string
  ) {}
}

export class acceptJoinRequestCommand {
  constructor(
    public readonly admin: string,
    public readonly user: string,
    public readonly group_id: string
  ) {}
}

export class leaveGroupCommand {
  constructor(
    public readonly email: string,
    public readonly group_id: string
  ) {}
}

export class createGroupCommand {
  constructor(
    public readonly admin: string,
    public readonly groupName: string
  ) {}
}

export class deleteGroupCommand {
  constructor(public readonly group_id: string) {}
}

export class renameGroupCommand {
  constructor(
    public readonly group_id: string,
    public readonly newName: string
  ) {}
}

export class kickUserCommand {
  constructor(
    public readonly email: string,
    public readonly group_id: string
  ) {}
}

export class sendInviteCommand {
  constructor(
    public readonly fromUser: string,
    public readonly toUser: string,
    public readonly group_id: string
  ) {}
}
