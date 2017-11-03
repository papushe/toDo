import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Control } from '@angular/common';
import {ChatService} from '../../services/chat.service';
import {ToDoService} from '../../services/to-do.service';
import { Router } from "@angular/router";
import { DateReversePipe } from '../../pipes/date-reverse.pipe';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
  export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  newUserConnected =[];
  newUserConnectedReverse =[];
  colorObj = [];
  messagesReverse = [];
  tryToConnect:boolean = true;
  connectionFailed:boolean = true;

  constructor(private chatService:ChatService,
              private _toDo: ToDoService,
              private router: Router,
              private dataReverse: DateReversePipe) {
    let newTitle =  this._toDo.Page();
    newTitle.setTitle('Chat');
  }

  ngOnInit() {
    if(!this._toDo.allUserData){
      this.router.navigate([`/opening-login-and-register`]);
      return;
    }
    this.connection = this.chatService.getMessages()
      .subscribe(message => {
        this.checkNewMessage(message);
      });
    if(this._toDo.allUserData){
      this.newConnection();
    }
  }

  ifEmpty(str){
    if(str){
      return str.replace(/\s/g, '').length;
    }
  }
  sendMessage(){
    this.chatService.sendMessage('new-message', this.message, this._toDo.allUserData.userName);
    this.message = '';
  }
  newConnection(){
    this.chatService.sendMessage('new-connection', this.message, this._toDo.allUserData.userName);
    this.message = '';
  }
  disconnecting(){
    if(this._toDo.allUserData){
      this.chatService.sendMessage('disconnect', this.message, this._toDo.allUserData.userName);
      this.message = '';
    }
  }

  updateColor(obj){
    for(let i = 0; i<this.colorObj.length; i++){
      if(this.colorObj[i].userName == obj.userName){
        return;
      }
    }
    let newUerColor = {
      userName : obj.userName,
      color : "#" + ((1 << 24) * Math.random() | 0).toString(16)
    };
    this.colorObj.push(newUerColor);
  }

  getColor(obj){
    for(let i = 0; i<this.colorObj.length; i++){
      if(this.colorObj[i].userName == obj.userName){
        return this.colorObj[i].color;
      }
    }
  }

  addDateToMessage(type, obj){
    obj.date = new Date();
    if(type == 'user'){
      this.newUserConnected.push(obj);
      this.newUserConnectedReverse = this.dataReverse.transform(this.newUserConnected)
    } else {
      this.messages.push(obj);
      this.messagesReverse = this.dataReverse.transform(this.messages);
    }
  }

  onEnter(e) {
    if(this.message.replace(/\s/g, '').length){
      let event = e || window.event,
        charCode = event.which || event.keyCode;
      charCode == '13' ? this.sendMessage() : '';
    }

  }
  clearChat(){
    this.messages = [];
    this.messagesReverse = [];
    this.newUserConnected = [];
    this.newUserConnectedReverse = [];
  }
  checkNewMessage(callback){
    if(callback.type == 'subscribe'){
      this.updateColor(callback);
      this.addDateToMessage('user' ,callback);
      this.tryToConnect = false;
      this.connectionFailed = false;
      return;
    }
    else if(callback.type == 'new-message'){
      this.addDateToMessage('new-message' ,callback);
      this.tryToConnect = false;
      this.connectionFailed = false;
      return;
    }
    else if(callback.type == 'user-disconnect'){
      this.addDateToMessage('user' ,callback);
      this.tryToConnect = false;
      this.connectionFailed = false;
      return;
    }
    else if(callback.type == 'TransportError'){
      this.tryToConnect = false;
      this.connectionFailed = true;
      return;
    }
    else if(callback.type == 'connect_error'){
      this.tryToConnect = false;
      this.connectionFailed = true;
      return;
    }
  }

  ngOnDestroy() {
    if(this._toDo.allUserData){
      this.disconnecting();
      this.connection.unsubscribe();
    }
  }
}
