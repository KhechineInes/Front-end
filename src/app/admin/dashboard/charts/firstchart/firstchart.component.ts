import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
@Component({
  selector: 'app-firstchart',
  templateUrl: './firstchart.component.html',
  styleUrls: ['./firstchart.component.css']
})
export class FirstchartComponent implements OnInit {
  
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Developpers'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
    series: [{
      name: 'Front-end',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Back-end',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'Designers',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }]
  }
  constructor() { }
  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}