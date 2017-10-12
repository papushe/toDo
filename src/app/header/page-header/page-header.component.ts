import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {ToDoService} from '../../../services/to-do.service'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  title:any;

  constructor(private _toDo: ToDoService, @Inject(DOCUMENT) private document: any) {
   this.title = this._toDo.Page();
  }
  ngOnInit() {

  }
}
