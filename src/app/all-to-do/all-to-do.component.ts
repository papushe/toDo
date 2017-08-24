import { Component, OnInit } from '@angular/core';
import {ToDoService} from '../../services/to-do.service';
import {ToDo} from '../../services/ToDo';

@Component({
  selector: 'app-all-to-do',
  templateUrl: './all-to-do.component.html',
  styleUrls: ['./all-to-do.component.css']
})
export class AllToDoComponent implements OnInit {
  allData: ToDo[];
  constructor(private _ToDo: ToDoService) {
    this.getAllToDo();
  }

  ngOnInit() {
  }
  getAllToDo() {
    this._ToDo.getAllToDo()
      .subscribe(
        data => this.allData = data
      );
  }
}
