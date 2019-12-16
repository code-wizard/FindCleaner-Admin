import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  // pass data - Array of data
  // pass label for the chart
  @Input() data: MultiDataSet = [[50, 50]];
  @Input() label: Label[] = ['Chart 1', 'Chart 2'];
  @Input() chartType: ChartType = 'doughnut';
  @Input() title = 'Title';
  @Input() chartOptions = {};
  @Input() chartLegend: boolean;
  @Input() data2;
  @Input() datasetColor: ChartDataSets[] = [
    {
      backgroundColor: [
        'rgba(255, 206, 86, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgb(95, 224, 95)',
        'rgb(95, 151, 224)',
        'rgb(224, 95, 224)',
        'rgb(224, 95, 134)',
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;

    // console.log(changes, 'datafromchart');
  }
}
