import { Controller, Get, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { Response } from 'express';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Controller('/api/v1/token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get()
  async getToken(@Res() res: Response) {
    try {
      const expired = await this.redis.get('token_expired');
      const tokenData = await this.redis.get('token');
      if (
        !isNaN(parseInt(expired)) &&
        parseInt(expired) > Date.now() &&
        tokenData
      ) {
        return res.json({
          status: 'success',
          data: { token: tokenData },
        });
      }
      const token = await this.tokenService.getAccessToken();
      await this.redis.set('token_expired', token?.expiry_date);
      await this.redis.set('token', token?.access_token);

      return res.json({
        status: 'success',
        data: { token: token?.access_token },
      });
    } catch (error) {}
  }
}
