import {OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService implements OnInit{

  constructor() { }

  private url = window.location.hostname;// + ':5000';
  // private url = 'https://papushetodo.herokuapp.com';

  private socket;

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

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}
