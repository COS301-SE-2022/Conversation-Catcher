import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class ApiGenerateNamesServiceService {
  constructor(private httpService: HttpService) {}
  async generateName(text: string) {
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({
      text: text,
    });

    try {
      return await lastValueFrom(
        this.httpService
          .post('http://localhost:5550/gennames', data, config)
          .pipe(map((res) => res.data))
      );
    } catch (error) {
      return '';
    }
    return '';
  }
}
