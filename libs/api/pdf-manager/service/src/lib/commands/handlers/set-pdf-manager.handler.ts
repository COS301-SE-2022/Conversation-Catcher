import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SetDownloadedPdfCommand } from '../impl/set-pdf-manager.command';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler
  implements ICommandHandler<SetDownloadedPdfCommand>
{
  constructor(private repository: MongoDBAccess) {}
  async execute(command: SetDownloadedPdfCommand): Promise<any> {
    return await this.repository.changeDownloaded(command.id);
  }
}

/*private url =
    'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
  private action = 'findOne';
  private config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key':
        'YrnAKHnpVpmVD5qJ5wOMA9Ga7rRZhoniOEJTQJKaTJHWovGoVgoxELB2MkSTXBem',
    },
  };
  private cluster = 'Cluster0';
  private userCollection = 'Users';
  private pdfCollection = 'PDF';
  private db = 'PDF';
  async execute(command: SetDownloadedPdfCommand): Promise<any> {
    console.log(command.id + ' Called for update');
    this.action = 'findOne';
    let data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: command.id },
    });

    const res = await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    console.log(res);

    this.action = 'updateOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: command.id },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    //Updates the name
    this.httpService.post(this.url + this.action, data, this.config).pipe(
      tap((res) => console.log(res.status)),
      map((res) => res.data)
    );

    //return updated record
    this.action = 'findOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: command.id },
    });
    return await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );*/
