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
  thisError:string = '';
  allData: User[];
  onLogin:boolean = true;

  constructor(private _toDo: ToDoService, private router: Router) { }


  ngOnInit() {
  }
  onLoginChange(){
    this.onLogin = !this.onLogin
  }

  createNewUser(userName, firstName, lastName, email, password) {
    this._toDo
      .createNewUser(password, userName, firstName, lastName, email)
      .subscribe(data => {
        this.allData = data,
          console.log(`data: ${data}`);
        },
        err =>{
          this.failureMsg('user', userName);
          console.log(`error: ${err}`);
        },
        () => {
          this.successMsg(userName)
        }
        );
  };
  loginNewUser(password, email){
    this._toDo
      .login(password, email)
      .subscribe(data => { //check wrong password or wrong email
          if(data.error){
            this.thisError = data.error;
            // this.failureMsg('user', data.error);
            return;
          }
          this.allData = data,
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
    if(this.thisError) {
      this.failureMsg('email',this.email);
      return;
    }
    this.successMsg(this.email);
    this._toDo.emailAddress = this.email;
    this.router.navigate([`/all-to-do`]);
  }
  login(){
    this.loginNewUser(this.password, this.email);
  }

  createNewUserForm(){
    if(this.password == this.passwordAgain){
      this.createNewUser(this.userName, this.firstName, this.lastName,this.email, this.password);
    }
  }
  successMsg(firstName){
    this.alertNotCreated= '';
    this.alertCreated=`Success: <i>${firstName}</i> was Created`;
  }
  failureMsg(type,name){
    if(type == 'pass'){
      this.alertCreated='';
      this.alertNotCreated=`Error: Wrong <i>${name}</i>`;
    }
    if(type == 'user'){
      this.alertCreated='';
      this.alertNotCreated=`Error: <i>${name}</i> not Created`;
    }
    if(type == 'email'){
      this.alertCreated='';
      this.alertNotCreated=`Error: can't login, the email: <i>${name}</i>, not good`;
    }
  }
}
