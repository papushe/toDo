import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../../services/to-do.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword:string = '';
  newPassword:string = '';
  newPasswordAgain:string = '';
  thisError:string = '';
  alertNotCreated:string = '';
  alertCreated:string = '';
  fitPassword:string = '';
  alertNotFitPassword:string = '';


  constructor (private router: Router, private _toDo: ToDoService) {
    let newTitle =  this._toDo.Page();
    newTitle.setTitle('Change Password');
  }

  ngOnInit() {
    if(!this._toDo.allUserData){
      this.router.navigate([`/opening-login-and-register`]);
    }
  }

  changeNewPassword(newPassword, password, email){
    this._toDo
      .changePassword(newPassword, password, email)
      .subscribe(data => {
          if(data.error){
            this.thisError = data.error;
            return;
          }
          this._toDo.allUserData = data[0];
          console.log(`data: ${data}`);
        },
        err =>{
          console.log(`error: ${err}`);
        },
        () => {
          this.checkBeforeRespond();
        }
      );
  }
  checkBeforeRespond(){
    if(this.thisError == `Wrong email`) {
      this.failureMsg('email',this._toDo.allUserData.email);
      return;
    }
    if(this.thisError == `Wrong Password`) {
      this.failureMsg('pass',this._toDo.allUserData.password);
      return;
    }
    this.successMsg();
    this.router.navigate([`/opening-login-and-register`]);
  }
  successMsg(){
    this.alertNotCreated= '';
    this.fitPassword= '';
    this.alertCreated=`Success: Password was Change`;
    this.timeOut(this.alertCreated);
  }
timeOut(name){
  setTimeout(function() {
    name = '';
  }, 8000);
}

  failureMsg(type,name){
    if(type == 'no fit'){
      this.fitPassword='';
      this.alertCreated='';
      this.alertNotFitPassword=`Error: the Old password not fit`;
      this.timeOut(this.alertNotFitPassword);
    }
    if(type == 'no new'){
      this.fitPassword='';
      this.alertCreated='';
      this.alertNotCreated=`Error: the new password not same`;
      this.timeOut(this.alertNotCreated);
    }
    if(type == 'pass'){
      this.alertCreated='';
      this.fitPassword='';
      this.alertNotCreated=`Error: Wrong Password, <i>${name}</i>`;
      this.timeOut(this.alertNotCreated);
    }
    if(type == 'user'){
      this.alertCreated='';
      this.fitPassword='';
      this.alertNotCreated=`Error: <i>${name}</i> not Created`;
      this.timeOut(this.alertNotCreated);
    }
  }
  changePassword(){
    if(this.oldPassword == this._toDo.allUserData.password){
      if(this.newPassword == this.newPasswordAgain){
        this.successMsg();
        this.changeNewPassword(this.newPassword, this.oldPassword, this._toDo.allUserData.email);
        this.clear();
      }else{
        this.failureMsg('no new', 'password');
        this.clear();
      }
    } else{
      this.failureMsg('no fit', 'password');
      this.clear();
    }
  }
  clear(){
    this.oldPassword = null;
    this.newPassword = null;
    this.newPasswordAgain = null;
  }
}
