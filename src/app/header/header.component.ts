import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {ToDoService} from '../../services/to-do.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userConnected:string = '';

  constructor (private router: Router, private _toDo: ToDoService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    if(this._toDo.allUserData){
      this.userConnected = this._toDo.allUserData.userName;
    }
  }

  logout(){
    this.router.navigate([`/opening-login-and-register`]);
    this._toDo.allUserData = null;

  }

}
