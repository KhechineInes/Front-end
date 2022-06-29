import { Component, OnInit } from '@angular/core';
;
import { Chart, ChartData, ChartEvent, ChartOptions, ChartType, registerables } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';
 
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent{
  userlist: any;
  back: any;
  Front: any;
  Designer: any;
  chart: any;
  constructor(private service:SharedService){
    Chart.register(...registerables);
  }
  ngOnInit() {
    this.service.getAnsList().subscribe((data =>{
      this.userlist = data;
      console.log(this.userlist);
      this.back=this.userlist.filter((res:any)=>{ return res.validated==true&&res.user.account.Function=="Back-end"});
      this.Front=this.userlist.filter((res:any)=>{ return res.validated==true&&res.user.account.Function=="Front-end"});
      this.Designer=this.userlist.filter((res:any)=>{ return res.validated==true&&res.user.account.Function=="Designer"});
      
      this.chart =new Chart('canvas' , {
        type:'doughnut',
        data:{
          labels:["Back" , "Front" , "Designer"],
          datasets: [
            {  data: [this.back.length,this.Front.length, this.Designer.length] , backgroundColor:["#F71E8A" ,"#7293DB"," #F7D568" ]},
           
           
           
           
          ],
        },
      });
    }));
  }

  public doughnutChartLabels: string[] = [ 'Back-end developpers', 'Front-end developpers', 'Designers' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 250,120 ,40] , backgroundColor:[" #F71E8A","#7293DB"," #F7D568"]},
      
     
    ],
   
  };
  public doughnutChartType: ChartType = 'doughnut'; 

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}
 

  
