import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent  implements OnInit {
  userlist:any=[];
  anslist:any=[];
  postList:any[]=[];
  validatedAns:any=[];
  user: any=[];
  userposts:any[]=[];
  chart: any=[];
  userAns: any=[];
  ansUserList: any=[];
  names:string[]=[];
  nameslist:string[]=[];
  salesData:ChartData[]=[];
  constructor(private service:SharedService){
    Chart.register(...registerables);
  }
  ngOnInit() {
         this.refreshPubList();
         
         Chart.register(...registerables);

         this.refreshUserList();
        

  }

refreshPubList() {
    this.service.getPostList().subscribe(data=>{
      this.postList=data;
      console.log(this.postList)
    });
  
  }
  
  
  async refreshUserList() {
     this.anslist=await this.service.getAnsList().toPromise();
    console.log(this.anslist , 'answers');
    
    this.service.getPostList().subscribe(data=>{
      this.postList=data;
      console.log(this.postList)
    });
    this.service.getUserList().subscribe((data =>{
      this.userlist = data,
      this.names= this.userlist.map((data:any)=>data.username)
      for(let i =0 ; i<this.names.length ; i++){
        if(this.names[i]!="admin"){
          this.nameslist.push(this.names[i])
        }
      }
      
      
      console.log(this.postList,'posts!!!!!!!!!!!!!!!!!')
      
      for(let i=0;i<this.nameslist.length;i++){
      this.ansUserList=this.anslist.filter((res:any)=>{ return res.user.username==this.nameslist[i]})
      this.userAns.push(this.ansUserList.length)
      this.validatedAns.push((this.ansUserList.filter((res:any)=>{return res.validated==true})).length)
      this.userposts.push((this.postList.filter((res:any)=>{return res.user.username==this.nameslist[i]})).length)
    
console.log(this.validatedAns,'validé')
console.log(this.userposts,"post de chaque user")
       }

      
      console.log(this.userlist , "ffffffffff") ; console.log(this.names , "namelist") ;console.log( this.nameslist , "liste des nom");
      
      this.chart =new Chart('canvas1' ,{
        type:'bar',
        data:{
        labels: this.nameslist,
            datasets: [
          { label: 'Questions', data:this.userposts  , backgroundColor:["#F71E8A"] , borderColor:["#7293DB"]},
          
          { label: 'Answers', data:this.userAns ,  backgroundColor: ["#7293DB"] },
          { label: 'ValidatedAnswers', data: this.validatedAns, backgroundColor:["#F3DE9B"]},
          
        ],
        
      }});
      
    }));
  
}






  
    
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


