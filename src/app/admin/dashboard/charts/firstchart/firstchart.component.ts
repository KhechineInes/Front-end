import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-firstchart',
  templateUrl: './firstchart.component.html',
  styleUrls: ['./firstchart.component.css']
})
export class FirstchartComponent {
  anslist: any[]=[];
  postList: any[]=[];
  salesData: any;
  chart: any=[];
  date: Date[]=[];
  dailypost: any=[];
  constructor(private service:SharedService  ){
    Chart.register(...registerables);
  }
  ngOnInit() {
this.refreshPubList();
this.refreshAnsList();

Chart.register(...registerables);
this.buildChart();



}

  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.anslist=data;
      this.anslist.push(data);
    });
  }
  refreshPubList() {
    this.service.getPostList().subscribe((data) => 
      this.postList=data,
      
      


      
    );
  
  }
datelist:any=[];




  buildChart(){
    
    this.service.getPostList().subscribe((data) =>{
      this.postList=data.sort((a:any, b:any) => {
        return   <any>new Date(a.date) - <any>new Date(b.date);
      }),
      
      this.date= this.postList.map((data:any)=>data.date)
      
      for(let i=0; i<this.postList.length; i++){
        if(moment(this.date[i]).format('DD/MM')!=moment(this.date[i+1]).format('DD/MM')){
        var d=moment(this.date[i]).format('DD/MM')
        
        this.datelist.push(d)
        }else if((moment(this.date[i]).format('DD/MM')==moment(this.date[i+1]).format('DD/MM')) && (moment(this.date[i]).format('DD/MM')!=moment(this.date[i+2]).format('DD/MM'))){
          var d=moment(this.date[i]).format('DD/MM')
        
          this.datelist.push(d)
          i=i+1
          
          
       
    }
    
  }
  this.datelist.push(moment(this.date[this.postList.length]).format('DD/MM'))
      for(let i=0; i<this.datelist.length; i++){
        this.dailypost.push((this.postList.filter((res:any)=>{return moment(res.date).format('DD/MM')==this.datelist[i]})).length)
      }
    
      
      this.chart =new Chart ('canvas2' ,{
    type:'line',
    data:{
    labels: /*[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],*/this.datelist,
    datasets: [
      { label: 'Questions', data:this.dailypost, tension: 0.5 ,borderColor:[" #F71E8A","#7293DB"," #F3DE9B"]},
      { label: 'Answers', data: [], tension: 0.5 },
      { label: 'Validated Answers', data: [], tension: 0.5 },
     ],
    }});
  }
    )
}
}
