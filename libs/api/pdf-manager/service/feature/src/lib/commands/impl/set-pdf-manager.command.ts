export class SetDownloadedPdfCommand {
  constructor(public readonly id?: string) {}
}

export class SetNamePdfCommand {
  constructor(public readonly id?: string, public readonly name?: string) {}
}

export class AddPdfCommand {
  constructor(
    public readonly email?: string,
    public readonly name?: string,
    public readonly text?: string
  ) {}
}

export class UpdateTagsCommand {
  constructor(public readonly id?: string, public readonly tags?: string[]) {}
}
