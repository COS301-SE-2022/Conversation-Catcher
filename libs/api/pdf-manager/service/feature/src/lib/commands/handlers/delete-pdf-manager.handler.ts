import { HttpService } from '@nestjs/axios';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, map, tap } from 'rxjs';
import { PdfManagerServiceModel } from '../../models/pdf-manager-service-feature.model';
//import {  } from "../events/delete-.event";
import { DeletePdfCommand } from '../impl/delete-pdf-manager.command';

@CommandHandler(DeletePdfCommand)
export class DeletePdfHandler implements ICommandHandler<DeletePdfCommand> {
  constructor(private publisher: EventPublisher,private repository: HttpService) {} //private repository: Repository,

  async execute({ id }: DeletePdfCommand) {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'deleteOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: id },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
    };
    return await lastValueFrom(
      this.repository.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
    return { id } as Partial<PdfManagerServiceModel>;
  }
}
