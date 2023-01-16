import { Component } from '@angular/core';
import { ChartData, ChartType, ChartEvent, Color } from 'chart.js';

@Component({
  selector: 'app-graphic01',
  templateUrl: './graphic01.component.html',
  styles: [],
})
export class Graphic01Component {
  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<typeof this.doughnutChartType> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        label: 'El superior',
        backgroundColor: ['#9e120e', '#ff5800', '#ffb414'],
      },
      {
        data: [50, 150, 120],
        label: 'El intermedio',
        backgroundColor: ['#0f20d3', '#8800ff', '#14ffd0'],
      },
      { data: [250, 130, 70], label: 'El inferior' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
