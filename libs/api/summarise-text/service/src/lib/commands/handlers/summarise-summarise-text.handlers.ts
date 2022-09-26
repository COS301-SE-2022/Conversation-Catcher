import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SummariseCommand } from '../impl/summarise-summarise-text.command';
//import { ajax, css } from "jquery";
// import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@CommandHandler(SummariseCommand)
export class SummariesHandler implements ICommandHandler<SummariseCommand> {
  constructor(private httpService: HttpService) {}

  async execute({ text, id }: SummariseCommand) {
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({
      text: text,
      id: id,
    });

    try {
      return await lastValueFrom(
        this.httpService
          .post('http://localhost:5000/summarise', data, config)
          .pipe(map((res) => res.data))
      );
    } catch (error) {
      return null;
    }
  }
}
