import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  constructor (private router: Router, private _toDo: ToDoService) {}

  ngOnInit() {
    if(!this._toDo.allUserData){
      this.router.navigate([`/opening-login-and-register`]);
    }
  }
}
