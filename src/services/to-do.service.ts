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

  emailAddress:string = '';

  constructor( private _http: Http) { }
  // baseUrl = 'https://papushetodo.herokuapp.com';
  baseUrl = 'http://localhost:4300';

  getAllData(email) {
    return this._http
      .get(`${this.baseUrl}/getAllToDo/${email}`)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  login(password, email){
    return this._http
      .get(`${this.baseUrl}/login/${password}/${email}`)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  createNewToDo(email, name, title, whatToDo) {
    return this._http
      .post(`${this.baseUrl}/createNewToDo/`, {email:email, name:name, title:title, whatToDo: whatToDo})
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
  dropToDo(title: string):Observable<any> {
    return this._http
      .get(`${this.baseUrl}/dropToDo/${title}`)
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
