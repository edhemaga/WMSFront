import { Component, OnInit } from '@angular/core';
import { LogDTO } from 'src/app/models/DTOs/log/log.model';

@Component({
  selector: 'app-problem-reports',
  templateUrl: './problem-reports.component.html',
  styleUrls: ['./problem-reports.component.css']
})
export class ProblemReportsComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 10;
  pageCount: number = 10;
  pageOffset: number = 10;

  logs: LogDTO[] = [];

  constructor() { }

  ngOnInit(): void {
    var log: LogDTO = {
      id: '123',
      changedAttribute: 'Količina',
      previouseValue: '0',
      newValue: '100',
      item: 'Test 1'
    }
    this.logs.push(log);
  }
}
