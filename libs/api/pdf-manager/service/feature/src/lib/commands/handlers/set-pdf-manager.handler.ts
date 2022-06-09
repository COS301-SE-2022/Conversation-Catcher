import { HttpService } from '@nestjs/axios';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, map, tap } from 'rxjs';
import { PdfManagerServiceModel } from '../../models/pdf-manager-service-feature.model';
import { GlobalKey } from '@conversation-catcher/api/pdf-manager/shared';
//import { SetNamePdfEvent, SetDownloadedPdfEvent } from "../events/set-pdf-manager.event";
//import { SetNamePdfEventHandler, SetDownloadedPdfEventHandler } from "../events/set-pdf-manager.event.handler";
import {
  SetNamePdfCommand,
  SetDownloadedPdfCommand,
} from '../impl/set-pdf-manager.command';

@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler
  implements ICommandHandler<SetDownloadedPdfCommand>
{
  constructor(
    private publisher: EventPublisher,
    private httpService: HttpService
  ) {} //private repository: Repository,

  async execute({ id }: SetDownloadedPdfCommand) {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    let action = 'findOne';
    let data = JSON.stringify({
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
        'api-key': GlobalKey.key,
      },
    };
    const res = await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    console.log(res);

    action = 'updateOne';
    data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: id },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    return await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }
}

@CommandHandler(SetNamePdfCommand)
export class SetNamePdfHandler implements ICommandHandler<SetNamePdfCommand> {
  constructor(
    private publisher: EventPublisher,
    private repository: HttpService
  ) {} //private repository: Repository,

  async execute({ id, name }: SetNamePdfCommand) {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'updateOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: id },
      update: {
        $set: { name: name },
      },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': GlobalKey.key,
      },
    };
    return await lastValueFrom(
      //Updates the name and returns if it was a success or not
      this.repository.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }
}
