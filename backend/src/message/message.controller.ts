import { Controller, Post, Body, Res, HttpStatus, Param } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import type { Message } from './message.interface';
import { HttpService } from '@nestjs/axios';
import type { Response } from 'express';

@Controller('/api/v1/message/fcm')
export class FCMMessageController {
  constructor(
    private readonly httpService: HttpService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('send/:project_id')
  async sentMessage(
    @Body() messages: Message,
    @Param('project_id') project_id: string,
    @Res() res: Response,
  ) {
    try {
      const access_token = await this.redis.get('token');
      const { data } = await this.httpService.axiosRef({
        method: 'POST',
        url: `https://fcm.googleapis.com/v1/projects/${project_id}/messages:send`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: messages,
      });
      return res.status(HttpStatus.OK).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error.response.data);
    }
  }
}

@Controller('/api/v1/message/apn')
export class APNMessageController {
  constructor(
    private readonly httpService: HttpService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('send')
  async sentMessage(@Body() messages: Message, @Res() res: Response) {}
}
