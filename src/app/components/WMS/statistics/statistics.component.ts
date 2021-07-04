import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { statisticsDTO } from 'src/app/models/DTOs/statistics/statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  xAxisLabelOrder: string = 'Datum';
  yAxisLabelOrder: string = 'Broj narudžbi';
  xAxisLabelItem: string = 'Količina';
  yAxisLabelItem: string = 'Kategorija';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  showLabels: boolean = true;

  orderStatistics: statisticsDTO[];
  groupedOrderStatistics: statisticsDTO[];
  groupedItemStatistics: statisticsDTO[];
  groupedStBinTypeStatistics: statisticsDTO[];
  constructor(public statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getOrderStatistics();
    this.getGrouppedOrderStatistics();
    this.getGrouppedItemStatistics();
    this.getGrouppedStBinTypeStatistics();
  }

  async getOrderStatistics() {
    await this.statisticsService.getOrderStats().subscribe(data => {
      this.orderStatistics = data as statisticsDTO[];
    });
  }

  async getGrouppedOrderStatistics() {
    await this.statisticsService.getGrouppedOrderStats().subscribe(data => {
      this.groupedOrderStatistics = data as statisticsDTO[];
    });
  }

  async getGrouppedItemStatistics() {
    await this.statisticsService.getGrouppedItemStats().subscribe(data => {
      this.groupedItemStatistics = data as statisticsDTO[];
    });
  }

  async getGrouppedStBinTypeStatistics() {
    await this.statisticsService.getGrouppedStBinTypeStats().subscribe(data => {
      this.groupedStBinTypeStatistics = data as statisticsDTO[];
    });
  }
}
