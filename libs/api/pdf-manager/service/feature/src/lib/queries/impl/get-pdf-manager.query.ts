export class GetPdfByIdQuery {
  constructor(public readonly id) {}
}

export class GetPdfsQuery {
  constructor(public readonly userid) {}
}

export class SemanticSearchQuery {
  constructor(public readonly query, public readonly docs) {}
}
