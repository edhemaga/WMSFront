import { Component, OnInit } from '@angular/core';
import { LogDTO } from 'src/app/models/DTOs/log/log.model';
import { LogService } from 'src/app/services/log.service';

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

  constructor(public logService: LogService) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(data => {
      this.logs = data as LogDTO[];
    })
  }
}
