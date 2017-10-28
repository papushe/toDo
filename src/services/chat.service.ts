import {OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {ToDoService} from '../services/to-do.service';
import { Injectable, Inject } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class ChatService implements OnInit{

  constructor(private _toDo: ToDoService,private router: Router) { }

  ngOnInit() {
    if (!this._toDo.allUserData) {
      this.router.navigate([`/opening-login-and-register`]);
      return;
    }
  }

  private url =  window.location.hostname+':'+this._toDo.allUserData.__v;

  private socket;


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
