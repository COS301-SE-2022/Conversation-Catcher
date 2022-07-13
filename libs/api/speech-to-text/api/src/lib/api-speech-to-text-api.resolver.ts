import { Resolver } from '@nestjs/graphql';
import { Mutation, Args } from '@nestjs/graphql';
import { ApiSpeechToTextServiceService } from "@conversation-catcher/api/speech-to-text/service";
import { PdfEntity } from "@conversation-catcher/api/pdf-manager/api/data-access"

@Resolver()
export class ApiSpeechToTextApiResolver {
    constructor(private SpeechToTextService: ApiSpeechToTextServiceService) {}

    @Mutation(() => PdfEntity)
  	async CovertSpeech(@Args('audio', { type: () => [String] }) audio: string) {
		this.SpeechToTextService.CovertSpeech(audio);
	  	return;
	}
}
