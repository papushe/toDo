import {OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService implements OnInit{

  constructor() { }

  // private url = 'http://localhost:5000';
  private url =  window.location.hostname+':8778';
  // private url = 'http://www.papushe.com/toDo:5000';

  private socket;
  port: any;

  ngOnInit(){

  }
  sendMessage(type, message, userName){
    if(type == 'add-message'){
      this.socket.emit(type, message, userName);
    }
    if(type == 'newConnection'){
       this.socket.emit(type, message, userName);
    }
    if(type == 'disconnect'){
      this.socket.emit(type, message, userName);
    }

  }



  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('message', (data) => {
        observer.next(data);
      });

      this.socket.on('port', (port) => {
        observer.next(port);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}
