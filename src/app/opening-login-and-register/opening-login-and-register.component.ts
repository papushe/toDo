import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import { User } from '../../services/User'
import { Router } from "@angular/router";

@Component({
  selector: 'app-opening-login-and-register',
  templateUrl: './opening-login-and-register.component.html',
  styleUrls: ['./opening-login-and-register.component.css']
})
export class OpeningLoginAndRegisterComponent implements OnInit {

  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  email:string = '';
  password: string = '';
  passwordAgain:string = '';
  alertCreated: string = '';
  alertNotCreated: string = '';
  alertNotFitPassword:string = '';
  fitPassword:string = '';
  thisError:string = '';
  onLogin:boolean = true;

  constructor(private _toDo: ToDoService, private router: Router) {}

  ngOnInit() {
    let newTitle =  this._toDo.Page();
    if(this.onLogin){
      newTitle.setTitle('Login');
    }else{
      newTitle.setTitle('Register');
    }
  }
  onLoginChange(){
    this.onLogin = !this.onLogin;
    this.ngOnInit()
  }

  createNewUser(userName, firstName, lastName, email, password) {
    this._toDo
      .createNewUser(password, userName, firstName, lastName, email)
      .subscribe(data => {
          this._toDo.allUserData = data;
          console.log(`data: ${data}`);
        },
        err =>{
          this.failureMsg('user', this._toDo.allUserData.userName);
          console.log(`error: ${err}`);
        },
        () => {
          this.successMsg(this._toDo.allUserData.userName);
          this.onLoginChange();
        }
        );
  };
  loginNewUser(password, email){
    this._toDo
      .login(password, email)
      .subscribe(data => {
          if(data.error){
            this.thisError = data.error;
            return;
          }
          this._toDo.allUserData = data[0];
            console.log(`data: ${data}`);
        },
        err =>{
          this.failureMsg('email',err);
          console.log(`error: ${err}`);
        },
        () => {
        this.checkBeforeRespond();
        }
      );
  }
  checkBeforeRespond(){
    if(this.thisError == `Wrong email`) {
      this.failureMsg('email',this.email);
      this.clear();
      return;
    }
    if(this.thisError == `Wrong Password`) {
      this.failureMsg('pass',this.password);
      this.clear();
      return;
    }
    if(this._toDo.allUserData){
      this.successMsg(this._toDo.allUserData.userName);
      this.router.navigate([`/all-to-do`]);
    }
  }
  login(){
    this.loginNewUser(this.password, this.email);
  }

  createNewUserForm(){ // same email
    if(this.password == this.passwordAgain){
      this.createNewUser(this.userName, this.firstName, this.lastName,this.email, this.password);
    } else{
      this.failureMsg('no fit', 'password');
    }
  }
  clear(){
    this.thisError = null;
    this.userName = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.password = null;
    this.passwordAgain = null;
  }
  timeOut(name){
    setTimeout(function() {
      name = '';
    }, 8000);
  }

  successMsg(userName){
    this.alertNotCreated= '';
    this.alertCreated=`Success: <i>${userName}</i> was Created`;
    this.timeOut(this.alertCreated);
  }

  failureMsg(type,name){
    if(type == 'no fit'){
      this.fitPassword='';
      this.alertNotFitPassword=`Error: the password not fit`;
      setTimeout(function() {
        this.alertNotFitPassword = '';
      }, 8000);
    }
    if(type == 'pass'){
      this.alertCreated='';
      this.alertNotCreated=`Error: Wrong Password, <i>${name}</i>`;
      setTimeout(function() {
        this.alertNotCreated = '';
      }, 8000);
    }
    if(type == 'user'){
      this.alertCreated='';
      this.alertNotCreated=`Error: <i>${name}</i> not Created`;
      setTimeout(function() {
        this.alertNotCreated = '';
      }, 8000);
    }
    if(type == 'email'){
      this.alertCreated='';
      this.alertNotCreated=`Error: can't login, the email: <i>${name}</i>, wrong`;
      setTimeout(function() {
        this.alertNotCreated = '';
      }, 8000);
    }
  }
}
