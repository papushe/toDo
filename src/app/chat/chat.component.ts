import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Control } from '@angular/common';
import {ChatService} from '../../services/chat.service';
import {ToDoService} from '../../services/to-do.service';
import { Router } from "@angular/router";

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
  colorObj = [];

  constructor(private chatService:ChatService, private _toDo: ToDoService, private router: Router) {
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
    } else {
      this.messages.push(obj);
    }
  }

  onEnter(e) {
    let event = e || window.event,
        charCode = event.which || event.keyCode;
    charCode == '13' ? this.sendMessage() : '';
  }
  clearChat(){
    this.messages = [];
    this.newUserConnected = [];
  }
  checkNewMessage(callback){
    if(callback.type == 'subscribe'){
      this.updateColor(callback);
      this.addDateToMessage('user' ,callback);
      return;
    }
    else if(callback.type == 'new-message'){
      this.addDateToMessage('new-message' ,callback);
      return;
    }
    else if(callback.type == 'user-disconnect'){
      this.addDateToMessage('user' ,callback);
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
