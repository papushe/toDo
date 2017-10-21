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
  usersConnected =[];
  colorObj = [];

  constructor(private chatService:ChatService, private _toDo: ToDoService, private router: Router) {}

  sendMessage(){
    this.chatService.sendMessage('add-message', this.message, this._toDo.allUserData.userName);
    this.message = '';
  }
  newConnection(){
    this.chatService.sendMessage('newConnection', this.message, this._toDo.allUserData.userName);
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
      this.usersConnected.push(obj);
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
    this.usersConnected = [];
  }
  checkNewMessage(message){
    if(message.type == 'subscribe'){
      this.updateColor(message);
      this.addDateToMessage('user' ,message);
      return;
    }
    else if(message.type == 'new-message'){
      this.addDateToMessage('newMessage' ,message);
      return;
    }
    else if(message.type == 'user-disconnect'){
      this.addDateToMessage('user' ,message);
      return;
    }
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
  ngOnDestroy() {
    if(this._toDo.allUserData){
      this.disconnecting();
      this.connection.unsubscribe();
    }
  }
}
