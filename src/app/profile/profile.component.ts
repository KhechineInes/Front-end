import { Component, Input, OnInit } from '@angular/core';
import { Post, Pub } from '../model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() Pub:any;
  PostList: any=[];
  PubId: number=0;
  pub: string="";
  pubsubject:string="";
  ModalTitle: string ="";
  user:any;
  val:string="";
 ansList:any=[];
  ActivateAddEditPostComp:boolean=false;
  ActivateAddEditAnsComp: boolean=false;
  ans: any;
  post:any;
  ImagePath:any;
  Image:string="";
  User:any;
  userlist:any=[];
  VoteList: any=[];
  VotePosList: any=[];
  VoteNList: any=[];
  ActivateModal: boolean=false;
  voteduser: any=[];
  ActivatedisModal: boolean=false;
  voteddisuser: any=[];
  valid=0;
  Vote: any[]=[];
  uservoted: any=[];
  postvoted: any=[];
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.user);
    this.getUser();
    
    this.getVoteList();
   
    this.getPostList();
    
    this.getVote();
    this.ImagePath=this.service.PhotoUrl+this.Image;
  }
  
  getVoteList(){
    this.service.getVoteList().subscribe((data)=>{
      this.Vote=data
    })
     }
  closeClick(){
    this.ActivateAddEditAnsComp=false;
    this.getPostList();
  }
  deleteClick(item : any){
    if(confirm('Are you sure??')){
      this.service.deletePost(item.pubId).subscribe(data=>{
        alert(data.toString());
        this.getPostList();
      })
    }
  }
  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.ansList=data;
    
    });
  }
  
  getPostList() {
    this.service.getPostList().subscribe((data) => {
      this.PostList=data.filter((res:any)=>res.user.id==this.user.user_id),
      console.log(this.PostList)}
    );
    
  }
  get sortData() {
    return this.PostList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
 getVote() {
    this.service.getVote().subscribe((data) =>
      this.VoteList=data);
    }
    
    getPositiveLike(id:any){
      this.VotePosList=this.VoteList.filter((res:any)=>{ return res.Positive==1&&res.post_id==id}),
      console.log(this.VotePosList)
    
    return this.VotePosList.length;
  }
  getNegativeLike(id:any){
    
    this.VotePosList=this.VoteList.filter((res:any)=>{ return res.Negative==1&&res.post_id==id}),
    console.log(this.VotePosList);
    
  return this.VotePosList;

}
getList(id:any){
  this.ActivateModal= true;
  this.ModalTitle="Like List"
  this.voteduser=this.VoteList.filter((res:any)=>{return res.Positive==1&& res.post_id==id}),
  console.log(this.voteduser);
  
  return this.voteduser

  
  }
  getdisList(id:any){
    this.ActivatedisModal= true;
    
    this.voteddisuser=this.VoteList.filter((res:any)=>{return res.Negative==1&& res.post_id==id}),
    console.log(this.voteddisuser);
    
    return this.voteddisuser
    
    }


    getPositiveansLike(id:any){
      this.VotePosList=this.VoteList.filter((res:any)=>{ return res.Positive==1&&res.ans_id==id}),
      console.log(this.VotePosList);
      
    return this.VotePosList;

  }
  getNegativeansLike(id:any){
    
    this.VotePosList=this.VoteList.filter((res:any)=>{ return res.Negative==1&&res.ans_id==id}),
    console.log(this.VotePosList);
    
  return this.VotePosList;

}
validateAns(item:any){
  var val={
    AnsId:item,
    validated:true

  }
  this.service.validateAns(val).subscribe(data=>{
    alert(data.toString());
    this.refreshAnsList();
    
  });
  this.service.updateDataSet(val).subscribe(data=>
    console.log(data.toString())
);
}
getansList(id:any){
this.ActivateModal= true;

this.voteduser=this.VoteList.filter((res:any)=>{return res.Positive==1&& res.ans_id==id}),
console.log(this.voteduser);

return this.voteduser

}
getdisansList(id:any){
  this.ActivatedisModal= true;
  
  this.voteddisuser=this.VoteList.filter((res:any)=>{return res.Negative==1&& res.ans_id==id}),
  console.log(this.voteddisuser);
  
  return this.voteddisuser
  
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


  editClick(item: any){
    this.post=item;
    this.ModalTitle="Edit Post";
    this.ActivateAddEditPostComp=true;
  }
  showAnsClick(item:any){
    this.val=item;
    this.PubId=item;
    this.refreshAnsList();
  }
  getUser() {
    this.service.getUserList().subscribe((data) => {
      this.userlist=data.filter((res:any)=>res.id==this.user.user_id),
      console.log(this.userlist)}
    );
   
    
  }
 
}
