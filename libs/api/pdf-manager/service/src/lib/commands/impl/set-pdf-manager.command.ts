export class SetDownloadedPdfCommand {
  constructor(
    public readonly id?: string,
  ) {}
}

export class SetNamePdfCommand {
  constructor(
    public readonly id?: string,
    public readonly name?: string,
  ) {}
}
