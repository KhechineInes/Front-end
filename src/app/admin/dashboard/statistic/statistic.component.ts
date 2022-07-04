import { Component, OnInit } from '@angular/core';
import { Cat, Post } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';




@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

 
  departments=[]
  count=[]
  CatList: Cat[] =[];
  PostList:any[]=[];
  ansList:any []=[];
  userList: any[]=[];
  actList:any[]=[];
  myDate : any = new Date();
  back: any=[];
  Front: any=[];
  Designer: any=[];
  ImagePath: string="";
  Image: string="";
  
  constructor(private service: SharedService ) {
    
   }
  link:string ="";
  nb : number =0 ;
  ngOnInit(): void {
   this.refreshPubList();
   this.refreshCatList();
   this.refreshAnsList();
   this.refreshUserList();
   this.ImagePath=this.service.PhotoUrl+this.Image;
   var d = new Date();
   var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
   console.log(this.myDate);
   this.myDate=this.myDate;
  
   
   
  }
  get sortData() {
    return this.PostList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

  nbAnswers(){
    this.link='ans';

  }
  nbCat(){
    this.link='cat';
  }
  nbPost(){
    this.link='post';
  }
  nbBack(){
    this.link='back';
  }
  nbFront(){
    this.link="Front";
  }
  nbDesign(){
    this.link="des";
  }
  anal(){
    this.link='';
    this.refreshPubList();
    this.refreshCatList();
    this.refreshAnsList();
    this.refreshUserList();

  }
  refreshCatList() {
    this.service.getCatList().subscribe(data => 
      this.CatList=data,
    );
    
  }
  refreshPubList() {
    this.service.getPostList().subscribe((data) => 
      this.PostList=data,
      
    );
    this.nb=this.PostList.length;
  }

 /* getpost()
  {
    this.service.getPostList().subscribe((data)=>
    {
        data.forEach((element)=> {
          this.departments.push(element)
          this.count.push(element.user.username)
          this.count=this.count.map(Number)
        });
  this.chartOptions = {
    xAxis: {
      categories: this.departments
    },
    series: [{
      name: 'Department',
      data: this.count,
    }, ],
    chart: {
      type: "bar",
    },
  };
})
}*/



  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.ansList=data;
    
    });
  }
  dateDiff(date1:any , date2: any){
    // Initialisation du retour
var tmp = <any>new Date(date1) - <any>new Date(date2);

tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
const diffsec = tmp % 60;                    // Extraction du nombre de secondes

tmp = Math.floor((tmp-diffsec)/60);    // Nombre de minutes (partie entière)
const diffmin = tmp % 60;                    // Extraction du nombre de minutes

tmp = Math.floor((tmp-diffmin)/60);    // Nombre d'heures (entières)
const diffhour = tmp % 24;                   // Extraction du nombre d'heures

tmp = Math.floor((tmp-diffhour)/24);   // Nombre de jours restants
const diffday = tmp;

return diffday;
}

  get sortDataAns() {


    return this.ansList.sort((a:any, b:any) => {
      
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  
  refreshUserList() {
    this.service.getUserList().subscribe((data =>{
      this.userList = data;
      this.back=this.userList.filter((res:any)=>{ return res.account.Function=="Back-end"});
      this.Front=this.userList.filter((res:any)=>{ return res.account.Function=="Front-end"});
      this.Designer=this.userList.filter((res:any)=>{ return res.account.Function=="Designer"});
    }));

    

  }

}
