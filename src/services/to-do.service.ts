import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ToDo } from './ToDo';


@Injectable()
export class ToDoService {

  baseUrl = 'https://papushetodo.herokuapp.com';
  constructor(private _http: Http) { }

  getAllToDo(){
    return this._http
      .get(`${this.baseUrl}/getAllToDo`)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }


  private logResponse(response: Response) {
    console.log(response);
  }
  private extractData(response: Response) {
    return response.json();
  }
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error')
  }
}
