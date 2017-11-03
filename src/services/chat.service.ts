import {OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {ToDoService} from './to-do.service';
import { Injectable, Inject } from '@angular/core';
import { Router } from "@angular/router";


@Injectable()
export class ChatService implements OnInit{

  constructor(private _toDo: ToDoService,private router: Router) { }
  socket:any;

  ngOnInit() {
    if (!this._toDo.allUserData) {
      this.router.navigate([`/opening-login-and-register`]);
      return;
    }
  }

  sendMessage(type, message, callback){
    if(type == 'new-message'){
      this.socket.emit(type, message, callback);
    }
    if(type == 'new-connection'){
       this.socket.emit(type, message, callback);
    }
    if(type == 'disconnect'){
      this.socket.emit(type, message, callback);
    }

  }

  getMessages() {
    let observable = new Observable(observer => {
      var url = window.location.hostname+':'+this._toDo.allUserData.__v;
      this.socket = io(url);

      this.socket.on('connect_error', (data) => {
        observer.next(data);
      });

      this.socket.on('connect_failed', (data) => {
        observer.next(data);
      });

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
