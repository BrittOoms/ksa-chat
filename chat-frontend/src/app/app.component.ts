import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { NgForm } from '@angular/forms';
import { MesssageService } from './messsage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messagesFromBE: string[] = [];

  constructor(private service: MesssageService) {
  }

  ngOnInit(): void {
    this.listenMessages();
  }

  private listenMessages() {
    Pusher.logToConsole = true;
    const pusher = new Pusher('7df4fca0d8687242cc84', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('my-channel');

    channel.bind('my-event', (data: any) => {
      this.messagesFromBE.push(data.message);
    });

  }


  onSubmit(form: NgForm) {
    this.service.sendMessage(form.value.message);
  }

}
