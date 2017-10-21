import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';


@Injectable()
export class ToDoService {

  allUserData:any;
  static title: any;
  constructor( private _http: Http) { }
  baseUrl = 'http://papushe-todo.herokuapp.com';
  // baseUrl = 'http://localhost:4300';

  Page(){
    return {
      title: function(){
        return ToDoService.title
      },
      setTitle: function(newTitle){
        ToDoService.title = newTitle;
      }
    };
  }

  getAllData(email) {
    return this._http
      .get(`${this.baseUrl}/getAllToDo/${email}`)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  login(password, email){
    return this._http
      .post(`${this.baseUrl}/login/`, {password:password, email:email})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  createNewToDo(email, title, whatToDo) {
    return this._http
      .post(`${this.baseUrl}/createNewToDo/`, {email:email, title:title, whatToDo: whatToDo})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  createNewUser(password, userName, firstName, lastName, email){
    return this._http
      .post(`${this.baseUrl}/createNewUser/`, {password:password, userName:userName,firstName:firstName, lastName:lastName, email:email})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }
  dropToDo(_id: string):Observable<any> {
    return this._http
      .post(`${this.baseUrl}/dropToDo/`,{_id:_id})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  changePassword (newPassword, oldPassword, email) {
    return this._http
      .post(`${this.baseUrl}/changePassword/`, {newPassword:newPassword, oldPassword:oldPassword, email:email})
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }


  private logResponse(response: Response) {
    console.log(response);
  }
  private extractData(response: Response) {
    return response.json();
  }
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
}
