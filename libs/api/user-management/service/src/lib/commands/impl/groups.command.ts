export class requestJoinCommand {
  constructor(
    public readonly email: string,
    public readonly groupName: string
  ) {}
}

export class addUserToCommand {
  constructor(
    public readonly user: string,
    public readonly groupName: string
  ) {}
}

export class removeUserFromCommand {
  constructor(
    public readonly email: string,
    public readonly groupName: string
  ) {}
}

export class createGroupCommand {
  constructor(
    public readonly admin: string,
    public readonly groupName: string
  ) {}
}

export class deleteGroupCommand {
  constructor(public readonly groupName: string) {}
}

export class renameGroupCommand {
  constructor(
    public readonly groupName: string,
    public readonly newName: string
  ) {}
}

export class sendInviteCommand {
  constructor(
    public readonly fromUser: string,
    public readonly toUser: string,
    public readonly groupName: string
  ) {}
}

export class addGroupPdfCommand {
  constructor(
    public readonly pdf_id: string,
    public readonly groupName: string
  ) {}
}

export class removeGroupPdfCommand {
  constructor(
    public readonly pdf_id: string,
    public readonly groupName: string
  ) {}
}

export class removeInviteCommand {
  constructor(
    public readonly user: string,
    public readonly groupName: string
  ) {}
}

export class removeRequestCommand {
  constructor(
    public readonly user: string,
    public readonly groupName: string
  ) {}
}
