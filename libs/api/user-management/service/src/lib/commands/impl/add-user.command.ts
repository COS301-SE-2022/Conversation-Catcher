export class addUserCommand {
  constructor(public readonly email?: string) {}
}

export class setUserCommand {
  constructor(
    public readonly oldEmail?: string,
    public readonly email?: string,
    public readonly colour?: any,
    public readonly pdfs?: string[]
  ) {}
}

export class deleteUserCommand {
  constructor(public readonly email?: string) {}
}
