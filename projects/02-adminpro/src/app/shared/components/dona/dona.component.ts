import { Component, Input, ViewChild } from '@angular/core';
import {
  ChartType,
  ChartData,
  ChartDataset,
  ChartConfiguration,
  Plugin,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicProps } from '../../interfaces/graphic-props';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() props!: GraphicProps;
  // Props
  public chartType!: ChartType;
  public chartLabels!: string[];
  public chartPlugins!: Plugin<typeof this.chartType>[] | [];
  public chartOptions!: ChartConfiguration['options'];
  public chartDataset!: ChartDataset[];
  public chartData!: ChartData<typeof this.chartType>;

  // ANCHOR : Constructor
  ngOnInit(): void {
    const { datasets, labels, type, options = {}, plugins = [] } = this.props;
    this.chartType = type;
    this.chartDataset = datasets;
    this.chartLabels = labels;
    this.chartOptions = options;
    this.chartPlugins = plugins;
    this.chartData = {
      datasets: this.chartDataset,
      labels: this.chartLabels,
    };
  }

  ngAfterViewInit(): void {

    // this.chart?.update();
  }
}
