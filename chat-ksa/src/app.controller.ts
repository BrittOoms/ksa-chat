import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

const Pusher = require('pusher');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {
  }

  @Get('hello')
  getHello(){
    console.log('hello')
    return 'hello hello helo'
  }

  @Post('send')
  postMessage(@Body() payload): string {
    console.log('test')
    console.log(payload);
    const appId = this.configService.get<string>('APP_ID');
    const key = this.configService.get<string>('KEY');
    const secret = this.configService.get<string>('SECRET');
    const cluster = this.configService.get<string>('CLUSTER');

    const pusher = new Pusher({
      appId: appId,
      key: key,
      secret: secret,
      cluster: cluster,
      useTLS: true
    });

    pusher.trigger('my-channel', 'my-event', {
      message: payload.message
    });
    return this.appService.getHello();
  }
}
