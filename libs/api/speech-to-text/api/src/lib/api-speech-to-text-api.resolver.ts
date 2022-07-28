import { Resolver } from '@nestjs/graphql';
import { Mutation, Args } from '@nestjs/graphql';
import { ApiSpeechToTextServiceService } from "@conversation-catcher/api/speech-to-text/service";

@Resolver()
export class ApiSpeechToTextApiResolver {
    constructor(private SpeechToTextService: ApiSpeechToTextServiceService) {}

    @Mutation(()=> String)
  	async ConvertSpeech(/*@Args('audioFile', { type: () => [AudioBuffer] }) audioFile : typeof AudioBuffer*/) {
      console.log('Speech to text called');
      // const audioFile = new Audio();
		return await this.SpeechToTextService.ConvertSpeech(/*audioFile*/);
		//const File = new Audio();
	  // return "Executed";
	}
}
