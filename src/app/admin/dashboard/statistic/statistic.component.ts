import { Component, OnInit } from '@angular/core';
import { Cat, Post } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  CatList: Cat[] =[];
  PostList:any[]=[];
  ansList: any[]=[];
  userList: any[]=[];
  myDate : any = new Date();
  constructor(private service: SharedService , ) {
    
   }
  link:string ="";
  nb : number =0 ;
  ngOnInit(): void {
   this.refreshPubList();
   this.refreshCatList();
   this.refreshAnsList();
   this.refreshUserList();
   var d = new Date();
   var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
   console.log(this.myDate);
   this.myDate=this.myDate;
   
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
  anal(){
    this.link='';
  }
  refreshCatList() {
    this.service.getCatList().subscribe(data => 
      this.CatList=data,
    );
    
  }
  refreshPubList() {
    this.service.getPostList().subscribe((data) => 
      this.PostList=data
    );
    this.nb=this.PostList.length;
  }
  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.ansList=data;
    
    });
  }
  refreshUserList() {
    this.service.getUserList().subscribe((data =>
      this.userList = data));

    

  }

}
