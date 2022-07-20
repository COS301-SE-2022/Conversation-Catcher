import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
} from '../impl/set-pdf-manager.command';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom, map, tap } from 'rxjs';

@CommandHandler(SetNamePdfCommand)
export class SetNamePdfHandler implements ICommandHandler<SetNamePdfCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id, name }: SetNamePdfCommand) {
    console.log('Running command for setname');
    // return await this.repository.setPDFName(id, name);
  }
}
@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler
  implements ICommandHandler<SetDownloadedPdfCommand>
{
  constructor(
    private repository: MongoDBAccess,
    // private httpService: HttpService
  ) {}
  async execute({ id }: SetDownloadedPdfCommand): Promise<any> {
    // console.log('HAndling command setDownloadPDF with id ' + id);
    return await this.repository.changeDownloaded(id);
  }
}

// const url =
//   'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
//   const config = {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': 'YrnAKHnpVpmVD5qJ5wOMA9Ga7rRZhoniOEJTQJKaTJHWovGoVgoxELB2MkSTXBem',
//     },
//   };
// let action = 'findOne';
// let data = JSON.stringify({
//   collection: 'PDF',
//     database: 'PDF',
//     dataSource: 'Cluster0',
//   filter: { id: id },
// });

// const res = await lastValueFrom(
//   this.httpService.post(url + action, data, config).pipe(
//     tap((res) => console.log(res.status)),
//     map((res) => res.data)
//   )
// );

// console.log(res);

// action = 'updateOne';
// data = JSON.stringify({
//   collection: 'PDF',
//     database: 'PDF',
//     dataSource: 'Cluster0',
//   filter: { id: id },
//   update: {
//     $set: { downloaded: !res.document.downloaded },
//   },
// });

// //Updates the name
// this.httpService.post(url + action, data, config).pipe(
//   tap((res) => console.log(res.status)),
//   map((res) => res.data)
// );

// //return updated record
// action = 'findOne';
// data = JSON.stringify({
//   collection: 'PDF',
//     database: 'PDF',
//     dataSource: 'Cluster0',
//   filter: { id: id },
// });
// return await lastValueFrom(
//   this.httpService.post(url + action, data, config).pipe(
//     tap((res) => console.log(res.status)),
//     map((res) => res.data)
//   )
// );
