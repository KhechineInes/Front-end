import { Component, Input, OnInit } from '@angular/core';
import { Answer, Post, User } from '../model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  
  date: any;
  

  constructor(private service:SharedService) { }
  @Input()post :any;
 
  ans:any
  list :Post[] =[];
  pubId:number =0;
  pub:string="";
  pubsubject:string=""
  UserName:string="";
  UserLastName:string="";
  ActivateAddEditAnsComp:boolean = false;
  ansList:any;
  user:any;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.pubId=this.post.pubId;
    this.pub=this.post.pub;
    this.pubsubject=this.post.pubSubject;
    this.UserName=this.UserName;
    this.UserLastName=this.UserLastName;
console.log(this.pubId);
   this.refreshAnsList();
    
      }
 

      refreshAnsList() {
        this.service.getAnsList().subscribe(data=>{
          this.ansList=data;
        
        });
      }
 
closeClick(){
        this.ActivateAddEditAnsComp=false;
        this.refreshAnsList();
      }
 
 ansClick(){
  this.ans={
    AnsId:0,
    Ans: "",
    
  }
  
  this.ActivateAddEditAnsComp=true;
 }
    
 deleteAnsClick(item : any){
  if(confirm('Are you sure??')){
    this.service.deleteAns(item).subscribe(data=>{
      alert(data.toString());
      this.refreshAnsList();
    })
    
  }
}
    
 

}
