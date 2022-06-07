import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
//import { FileCategory, SocialMedia } from '@prisma/client'
//import { DeleteStudentProfileFilesCommand, DeleteStudentProfileSocialMediaCommand, DeleteStudentProfileTagsCommand } from './commands/impl/delete-student-profile.command';
//import { SetStudentProfileBioCommand, SetStudentProfileEmailCommand, SetStudentProfileFilesCommand, SetStudentProfileLocationCommand, SetStudentProfileNameCommand, SetStudentProfileProfilePictureCommand, SetStudentProfileSocialMediaCommand, SetStudentProfileTagsCommand } from './commands/impl/set-student-profile.command';
//import { GetStudentProfileBioQuery, GetStudentProfileDOBQuery, GetStudentProfileEmailsQuery, GetStudentProfileEmploymentStatusQuery, GetStudentProfileFilesQuery, GetStudentProfileLocationQuery, GetStudentProfileNameQuery, GetStudentProfilePFPQuery, GetStudentProfileSocialMediaQuery, GetStudentProfileTagsQuery } from './queries/impl';

@Injectable()
export class PdfManagerService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

   /* async getName(userid : string) {
        return await this.queryBus.execute( new GetStudentProfileNameQuery(userid))
    }
    async removeTag(userid : string, tag: string) {
      return await this.commandBus.execute( new DeleteStudentProfileTagsCommand(userid, tag))
    }*/
}
