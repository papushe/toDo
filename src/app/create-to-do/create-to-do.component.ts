import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import {ToDo} from '../../services/ToDo';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.css']
})
export class CreateToDoComponent implements OnInit {
  title: string = '';
  whatToDo:string = '';
  alertCreated: string = '';
  alertNotCreated: string = '';
  allData: ToDo[];


  constructor(private _toDo: ToDoService, private router: Router) {
    var newTitle =  this._toDo.Page();
    newTitle.setTitle('Create To Do');
  }
  ngOnInit() {
    if(!this._toDo.allUserData){
      this.router.navigate([`/opening-login-and-register`]);
    }
  }

  createNewToDo(email, title, whatToDo){
    this._toDo
      .createNewToDo(email, title, whatToDo)
      .subscribe(data => { // why no see successMsg
        this.allData = data,
          console.log(`data: ${data}`);
        },
        err =>{
        this.failureMsg(title);
        console.log(`error: ${err}`);
        },
        ()=>{
          this.successMsg(title);
          this.clear();
        });
  };

  onForm(){
    this.createNewToDo(this._toDo.allUserData.email, this.title, this.whatToDo);
    this.clear();
  }

  clear(){
    this.title = null;
    this.whatToDo = null;
  }
  successMsg(title){
    this.alertNotCreated= '';
    this.alertCreated=`Success: <i>${title}</i> was Created`;
  }
  failureMsg(val){
    this.alertCreated='';
    this.alertNotCreated=`Error: <i>${val.createMixName}</i> not Created, tracks must be from 1 to 9`;
  }
}
