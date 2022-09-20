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
  VotePosListData: any=[];
  VotePosList: any=[];
  ActivateModal: boolean=false;
  voteduser: any=[];
  ActivatedisModal: boolean=false;
  voteddisuser: any=[];
  ImagePath: string="";
  Image: string="";
  
  valid=0;
  Vote: any[]=[];
  uservoted: any[]=[];
  postvoted: any[]=[];
  postans: any;
  anspost: any=[];
  pubId: any;
  

  constructor(private service:SharedService) { }
  @Input()post :any;
 
  ans:any
  list :Post[] =[];
  pbId:number =0;
  pub:string="";
  pubsubject:string=""
  UserName:string="";
  UserLastName:string="";
  ActivateAddEditAnsComp:boolean = false;
  ansList:any=[];
  user:any;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.refreshAnsList();
    this.pbId=this.post.pubId;
    this.pub=this.post.pub;
    this.pubsubject=this.post.pubSubject;
    this.UserName=this.UserName;
    this.UserLastName=this.UserLastName;
    this.ImagePath=this.service.PhotoUrl+this.Image;
    this.getVote();
    this.getVoteList();
console.log(this.pbId , "id pub");
 
   
    
      }
 

      refreshAnsList() {
        this.service.getAnsList().subscribe(data=>{
          this.ansList=data;
          this.pubId = this.ansList[0].pub_id.pubId
          console.log(this.pubId,"teeeeest")
        console.log(this.ansList[1].pub_id.pubId,"teeeeest")
        });
      }
      getVote(){
        this.service.getVote().subscribe((data) => {
          this.VotePosListData=data
             
               }
            )
      }
      getPositiveLike(id:any){
        this.VotePosList=this.VotePosListData.filter((res:any)=>{ return res.Positive==1&&res.ans_id==id});
        
        
      return this.VotePosList;
  
    }
    getNegativeLike(id:any){
      
      this.VotePosList=this.VotePosListData.filter((res:any)=>{ return res.Negative==1&&res.ans_id==id});
    
      
    return this.VotePosList;
  
  }
  getList(id:any){
  this.ActivateModal= true;
  
  this.voteduser=this.VotePosListData.filter((res:any)=>{return res.Positive==1&& res.ans_id==id});
  
  
  return this.voteduser
  
  }
  getdisList(id:any){
    this.ActivatedisModal= true;
    
    this.voteddisuser=this.VotePosListData.filter((res:any)=>{return res.Negative==1&& res.ans_id==id});
    
    
    return this.voteddisuser
    
    }

    getVoteList(){
      this.service.getVoteList().subscribe((data)=>{
        this.Vote=data
      })
       }

    addVotePositive(id:any){
      var val = {
       
        user_id:this.user.user_id,
        post_id:null,
        Positive:1,
        Negative:0,
        ans_id:id,
       
  
      };
      var index =0;
      var id ;
      this.uservoted=this.Vote.map((data:any)=>data.user_id);
      console.log(this.Vote,'toutela liste');
      console.log(this.uservoted , 'userlist');
      this.postvoted=this.Vote.map((data:any)=>data.ans_id);
      console.log(this.postvoted , "postlist ");
      
      
      
      var id ;
      for( let i=0; i<this.Vote.length; i++){
       
        if((val.user_id==this.uservoted[i]) && (val.ans_id==this.postvoted[i])){
          id=this.Vote[i].VoteId
  
         index=1
         
      }
    }
      if(index == 1){
        this.service.deleteVote(id).subscribe(res=>{
          console.log(res.toString());
          this.getVote();
          index =1 ;
          this.getVoteList();
        });
       
      
      }
      if (index ==0){
        
         this.service.addVote(val).subscribe(res => {
        console.log(res.toString());
        this.getVote();
        this.getVoteList();
        index=1;
      });}
    
       
    }
    addVoteNegative(id:any){
      var val = {
       
        user_id:this.user.user_id,
        ans_id:id,
        Negative:1,
        Positive:0,
        post_id:null
       
  
      };
      var index =0;
    var id ;
    this.uservoted=this.Vote.map((data:any)=>data.user_id);
    console.log(this.Vote,'toutela liste');
    console.log(this.uservoted , 'userlist');
    this.postvoted=this.Vote.map((data:any)=>data.ans_id);
    console.log(this.postvoted , "postlist ");
    
    console.log(this.Vote[0] , 'test');
    var id ;
    for( let i=0; i<this.Vote.length; i++){
     
      if((val.user_id==this.uservoted[i]) && (val.ans_id==this.postvoted[i])){
        id=this.Vote[i].VoteId

       index=1
       
    }
  }
    if(index == 1){
      this.service.deleteVote(id).subscribe(res=>{
        console.log(res.toString());
        this.getVote();
        index =1 ;
        this.getVoteList();
      });
     
    
    }
    if (index ==0){
      
       this.service.addVote(val).subscribe(res => {
      console.log(res.toString());
      this.getVote();
      this.getVoteList();
      index=1;
    });}
    }


      get sortData() {
        return this.ansList.sort((a:any, b:any) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
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
  if(this.ActivateAddEditAnsComp==false){ this.ActivateAddEditAnsComp=true;}
  else{this.ActivateAddEditAnsComp=false;}
  
 }
    
 deleteAnsClick(item : any){
  if(confirm('Are you sure??')){
    this.service.deleteAns(item).subscribe(data=>{
      alert(data.toString());
      this.refreshAnsList();
    })
    
  }
}
validateAns(item:any){
  this.postans=this.ansList.filter((res:any)=>{return res.AnsId==item}).map((data:any)=>data.pub_id)
  console.log(this.postans,"this answer is validated")
  this.anspost=this.ansList.filter((res:any)=>{return res.pub_id==this.postans})
  console.log(this.anspost , "liste des answers d'une poste")
  console.log(this.anspost[0].validated ,"vérifieee!!!!!")
  for(let i=0; i<this.anspost.length; i++){
    if (this.anspost[i].validated==1){
      var val ={
        AnsId:this.anspost[i].AnsId,
        validated:false
      }
      this.service.validateAns(val).subscribe()
      
        this.refreshAnsList();
        
      
    }
  }
  var val={
    AnsId:item,
    validated:true
    
  }
  this.service.validateAns(val).subscribe(data=>{
    alert(data.toString());
    this.refreshAnsList();
    
    
    
    
  });
  this.service.updateDataSet(val).subscribe(data=>
    console.log(data.toString()
));


  }
}
