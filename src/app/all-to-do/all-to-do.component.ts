import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import {ToDo} from '../../services/ToDo';
import { Router } from "@angular/router";

@Component({
  selector: 'app-all-to-do',
  templateUrl: './all-to-do.component.html',
  styleUrls: ['./all-to-do.component.css']
})
export class AllToDoComponent implements OnInit {

  allData: ToDo[];

  constructor(private _toDo: ToDoService, private router: Router) { }
  ngOnInit(): any {
    if(!this._toDo.emailAddress){
      this.router.navigate([`/opening-login-and-register`]);
    }
    this.getAllToDo(this._toDo.emailAddress);
    console.log(this._toDo.emailAddress);
  }

  getAllToDo(email): void {
    this._toDo.getAllData(email)
      .subscribe(data => {
          this.allData = data,
            console.log(`data: ${data}`);
        },
        err=>{
          console.log(`error: ${err}`);
        },
        ()=>{
        console.log("complete get all todo");
        });
  }

  deleteToDo(data: ToDo): void{
    this._toDo.dropToDo(data.title)
      .subscribe(data => {
        this.allData = data,
          console.log(`data: ${data}`);
      },err=>{
          console.log(`error: ${err}`);
        },
        ()=>{
          console.log("complete delete to do");
        });
    this.ngOnInit();
  }
}
