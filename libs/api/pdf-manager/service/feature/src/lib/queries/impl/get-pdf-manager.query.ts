export class GetPdfByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetPdfsByArrQuery {
  constructor(public readonly ids: string[]) {}
}

export class GetUserPdfsQuery {
  constructor(public readonly userid: string) {}
}

export class SemanticSearchQuery {
  constructor(public readonly query: string, public readonly docs) {}
}
