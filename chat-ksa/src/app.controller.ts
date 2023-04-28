import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

const Pusher = require('pusher');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {
  }

  appId = this.configService.get<string>('APP_ID');
  key = this.configService.get<string>('KEY');
  secret = this.configService.get<string>('SECRET');
  cluster = this.configService.get<string>('CLUSTER');

  pusher = new Pusher({
    appId: this.appId,
    key: this.key,
    secret: this.secret,
    cluster: this.cluster,
    useTLS: true
  });

  @Post('/pusher/auth')
  authChannel(@Body() payload, @Req() req: any, @Res() res: any) {

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const authResponse = this.pusher.authorizeChannel(socketId, channel);
    console.log(authResponse);
    res.send(authResponse);
    this.pusher.trigger('my-channel', 'my-event', { message: 'hello world' });
  }

  @Post('/pusher/user-auth')
  authUser(@Body() payload, @Req() req: any, @Res() res: any) {
    const socketId = req.body.socket_id;

    console.log('user auth called');
    // Replace this with code to retrieve the actual user id and info
    const user = {
      id: 'some_id',
      user_info: {
        name: 'John Smith'
      },
      watchlist: ['another_id_1', 'another_id_2']
    };
    const authResponse = this.pusher.authenticateUser(socketId, user);
    res.send(authResponse);
  }

  @Post('send')
  postMessage(@Body() payload, @Req() req: any, @Res() res: any) {
    this.pusher.trigger('my-channel', 'my-event', { message: payload.data });
  }
}
