import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import {ToDo} from '../../services/ToDo';
import { Router } from "@angular/router";
import { DateReversePipe } from '../../pipes/date-reverse.pipe';

@Component({
  selector: 'app-all-to-do',
  templateUrl: './all-to-do.component.html',
  styleUrls: ['./all-to-do.component.css']
})
export class AllToDoComponent implements OnInit {

  allData: ToDo[];
  allDataReverse: ToDo[];
  title:any;
  whatToDo:any;
  showForm:boolean=false;
  thisLi= null;
  backgroundIndex= null;
  hasChanges:boolean = false;
  tempTitle:string = '';
  tempWhatToDo:string = '';
  changeBackgroundColor:boolean = false;
  changeWrongBackgroundColor:boolean = false;

  constructor(private _toDo: ToDoService,
              private router: Router,
              private dataReverse: DateReversePipe) {
    let newTitle =  this._toDo.Page();
    newTitle.setTitle('All To Do');
  }
  ngOnInit(): any {
    if(!this._toDo.allUserData){
      this.router.navigate([`/opening-login-and-register`]);
    } else {
      if(this._toDo.allUserData){
        this.getAllToDo(this._toDo.allUserData.email);
      }
    }
  }

  toggleShowForm(i,data){
    if(!this.hasChanges){
      this.tempTitle = data.title;
      this.tempWhatToDo = data.whatToDo;
      this.hasChanges = true;
    }else{
      if( (this.tempTitle != data.title) || (this.tempWhatToDo != data.whatToDo)){
        this.updateToDo(data.title, data.whatToDo, data._id, i);
      }
    }
    if(this.thisLi == null){
      this.thisLi =i;
    }else{
      this.thisLi = null;
    }
    this.showForm = !this.showForm;
  }

  updateToDo(title, whatToDo, _id, i): void{
    this._toDo.updateToDo(title, whatToDo, _id)
      .subscribe(data => {
        let index = this.checkId(data._id);
          this.allData[index] = data;

          console.log(`data: ${data}`);
        },
        err=>{
          console.log(`error: ${err}`);
          this.changeWrongBackgroundColor = true;
          this.backgroundIndex = i;
          setTimeout(()=>{
            this.changeWrongBackgroundColor = !this.changeWrongBackgroundColor,
              this.allDataReverse = this.dataReverse.transform(this.allData);
          }, 5000);
        },
        ()=>{
          console.log("complete update to do");
          this.changeBackgroundColor = true;
          this.backgroundIndex = i;
          setTimeout(()=>{
            this.changeBackgroundColor = !this.changeBackgroundColor,
              this.allDataReverse = this.dataReverse.transform(this.allData);
          }, 5000);
          this.hasChanges = false;

        });
  }

  checkId(id){
    for(let i = 0; i<this.allData.length; i++){
      if(this.allData[i]._id == id){
        return i;
      }
    }
  }

  // sortData(){
  //   this.allDataReverse.sort(function(a:any, b:any) {
  //     return new Date(a.date) - new Date(b.date);
  //   });
  // }




  getAllToDo(email): void {
    this._toDo.getAllData(email)
      .subscribe(data => {
          this.allData = data;
          this.allDataReverse = this.dataReverse.transform(this.allData);
            console.log(`data: ${data}`);
        },
        err=>{
          console.log(`error: ${err}`);
        },
        ()=>{});
  }

  deleteToDo(data: ToDo): void {
    this._toDo.dropToDo(data._id)
      .subscribe(data => {
          this.allData = data;
          console.log(`data: ${data}`);
        }, err => {
          console.log(`error: ${err}`);
        },
        () => {
          this.getAllToDo(this._toDo.allUserData.email);
          console.log("complete delete to do");
        });
  }
}
