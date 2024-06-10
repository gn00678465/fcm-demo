import { Controller, Post, Body } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import type { Message } from './message.interface';
import { HttpService } from '@nestjs/axios';
import type { AxiosResponse } from 'axios';
import type { Observable } from 'rxjs';

@Controller('/api/v1/message')
export class MessageController {
  #_apiUrl: string =
    'https://fcm.googleapis.com/v1/projects/fcm-demo-7b1d0/messages:send';

  constructor(
    private readonly httpService: HttpService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post()
  sentMessage(@Body() messages: Message): Observable<AxiosResponse<any>> {
    console.log('🚀 ~ MessageController ~ sentMessage ~ messages:', messages);
    return undefined;
  }
}
