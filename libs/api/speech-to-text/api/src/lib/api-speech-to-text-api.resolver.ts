import { Resolver } from '@nestjs/graphql';
import { Mutation, Args } from '@nestjs/graphql';
import { ApiSpeechToTextServiceService } from "@conversation-catcher/api/speech-to-text/service";

@Resolver()
export class ApiSpeechToTextApiResolver {
    constructor(private SpeechToTextService: ApiSpeechToTextServiceService) {}

    @Mutation()
  	async CovertSpeech(@Args('audioFile', { type: () => [Audio] }) audioFile : typeof Audio) {
		this.SpeechToTextService.CovertSpeech(audioFile);
		//const File = new Audio();
	  	return;
	}
}
