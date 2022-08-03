import { lastValueFrom, map, tap } from 'rxjs';
import { GlobalKey } from '@conversation-catcher/api/pdf-manager/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDBAccess {
  constructor(private httpService: HttpService) {}

  //Private attributes of class:
	private url = 'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
	private action;
	private config = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Request-Headers': '*',
			'api-key': GlobalKey.key,
		},
	};
	private cluster = 'Cluster0';
	private userCollection = 'Users';
	private pdfCollection = 'PDF';
	private db = 'PDF';

	//Functions
	async logIn(email: string) {
		this.action = 'findOne';

		const data = JSON.stringify({
			//the data object passed to the http request which specifies what should be returned
			collection: this.pdfCollection,
			database: this.db,
			dataSource: this.cluster,
			filter: { email: email },
		});

		//Returns the result of the httpRequest
		return await lastValueFrom(
			this.httpService.post(this.url + this.action, data, this.config).pipe(
				tap((res) => console.log(res.status)),
				map((res) => res.data.document)
			)
		);
	}

	async signUp(email: string) {
		const url = 'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/insertOne';
		const data = JSON.stringify({
			collection: 'Users',
			database: 'PDF',
			dataSource: 'Cluster0',
			document: {
				email: email,
				pdfs: ['id'],
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
			this.httpService.post(url, data, config).pipe(
				tap((res) => console.log(res.status)),
				map((res) => res.data)
			)
		);
	}
}
