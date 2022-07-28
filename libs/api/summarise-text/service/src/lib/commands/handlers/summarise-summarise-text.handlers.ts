import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SummariseCommand } from '../impl/summarise-summarise-text.command';
//import { ajax, css } from "jquery";
// import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom, map, tap } from 'rxjs';

@CommandHandler(SummariseCommand)
export class SummariesHandler implements ICommandHandler<SummariseCommand> {
  // constructor() {}

  async execute({ text }: SummariseCommand) {

    fetch('http://127.0.0.1:5000/summarise', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    }).then((response) => { return response; });
  }
}
