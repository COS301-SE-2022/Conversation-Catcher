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

export class AddTagsCommand {
  constructor(public readonly id?: string, public readonly tags?: string[]) {}
}

export class DeleteTagsCommand {
  constructor(public readonly id?: string, public readonly tags?: string[]) {}
}

export class SetSummarizedCommand {
  constructor(
    public readonly id?: string,
    public readonly summarized?: string
  ) {}
}

export class SetEmbeddingsCommand {
  constructor(
    public readonly id?: string,
    public readonly embeddings?: string
  ) {}
}
