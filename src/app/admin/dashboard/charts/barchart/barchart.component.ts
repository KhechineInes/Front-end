import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  salesData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Mobiles', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 , backgroundColor:["#F71E8A"]},
      { label: 'Laptop', data: [200, 100, 400, 50, 90], tension: 0.5 , backgroundColor:["#7293DB"] },
      { label: 'AC', data: [500, 400, 350, 450, 650], tension: 0.5, backgroundColor:["#F7D568"] },
     
     
    ],
    
  };
  
    
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
    
  };
}


