import { Component, OnInit, PipeTransform } from '@angular/core';
import { Answer, Cat, Post, User } from 'src/app/model';
import {SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-show-pub',
  templateUrl: './show-pub.component.html',
  styleUrls: ['./show-pub.component.css'],
  
})

export class ShowPubComponent implements OnInit {
  PostList: any=[]
  AnsList: any;
  UserList: User[] =[];
  CatList: Cat[]=[];
  ActivateAddEditAnsComp: boolean=false;
  pubId: any;
  ans: any;
  pub: any;
  pk=0;
  VoteId:any=[];
  ActivateModal: boolean=false;
  voteduserList:any=[];
  voteduser:any=[];
  voteddisuser: any=[];
  ActivatedisModal: boolean=false;
  pubsubjectfilter: any;
  uservoted: any=[];
  postvoted: any=[];
  voteId : any=[];
  constructor(private service:SharedService) { }
 
  ModalTitle: string ="";
  ActivateAddEditPostComp:boolean=false;
  post:any;
  user:any;
  ImagePath:string = "";
 Vote:any=[];
  PostListWithoutFilter:any=[];
  filePath: string="";
  Image: string ="";
  VotePosList:any=[]
  VotePosListData:any=[]
  liked : number =0;
  
  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.refreshPostList();
    
    this.filePath=this.service.PhotoUrl+this.pub;
    this.getVote();
    this.ImagePath=this.service.PhotoUrl+this.Image;
    this.getVoteList();

    
  }
  getVote(){
    this.service.getVote().subscribe((data) => {
      this.VotePosListData=data
         
           }
        )
        this.ImagePath=this.service.PhotoUrl+this.Image;
  }
 getVoteList(){
this.service.getVoteList().subscribe((data)=>{
  this.Vote=data
})
 }

  getPositiveLike(id:any){
      this.VotePosList=this.VotePosListData.filter((res:any)=>{ return res.Positive==1&&res.post_id==id});
      this.ImagePath=this.service.PhotoUrl+this.Image;
      
    return this.VotePosList;

  }
  getNegativeLike(id:any){
    
    this.VotePosList=this.VotePosListData.filter((res:any)=>{ return res.Negative==1&&res.post_id==id});
    this.ImagePath=this.service.PhotoUrl+this.Image;
    
  return this.VotePosList;

}
getList(id:any){
this.ActivateModal= true;
this.ModalTitle="Like List"
this.voteduser=this.VotePosListData.filter((res:any)=>{return res.Positive==1&& res.post_id==id})
;
this.ImagePath=this.service.PhotoUrl+this.Image;
return this.voteduser

}
getdisList(id:any){
  this.ActivatedisModal= true;
  
  this.voteddisuser=this.VotePosListData.filter((res:any)=>{return res.Negative==1&& res.post_id==id})
  ;
  
  return this.voteddisuser
  
  }
  
  addClick(){
    this.ModalTitle="Add Post";
    this.ActivateAddEditPostComp=true;
    this.refreshPostList();

  }
  
  editClick(item: any){
    this.post=item;
    this.ModalTitle="Edit Post";
    this.ActivateAddEditPostComp=true;
   
  }
  closeClick(){
    this.ActivateAddEditAnsComp=false;
    this.ActivateModal=false;
    this.ActivatedisModal=false;
    this.refreshPostList();
  }
  deleteClick(item : any){
    if(confirm('Are you sure??')){
      this.service.deletePost(item.pubId).subscribe(data=>{
        alert(data.toString());
        this.refreshPostList();
      })
    }
  }
  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.AnsList=data;
    
    });
  }
  showClick(item:any,user:any) {
    this.GetOnePost(item,user);
    
    this.refreshAnsList();
    
   
    
  }
  GetOnePost(data:any, user:any) {
      this.post=data
      this.user=user
  
  
  
  
  
    this.ActivateAddEditPostComp=true;

}
ansClick(item:any){
  this.post=item;
  
  this.ActivateAddEditAnsComp=true;
 }
  closeClick1(){
    this.ActivateAddEditPostComp=false;
    this.refreshPostList();
    this.refreshAnsList();
  }
  closeClick2(){
    this.ActivateAddEditAnsComp=false;
    this.refreshPostList();
    this.refreshAnsList();
  }
  refreshPostList(){
    this.service.getPostList().subscribe(data=>{
      this.PostList= data.sort((a:any, b:any) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      });
     
      
      this.PostListWithoutFilter=data;
    });
  }
  uploadfile(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.pub=data.toString();
      this.filePath=this.service.PhotoUrl+this.pub;
    })
  }
 
  addVotePositivePoste(id:any){
  
    
    
    var val = {
     
      user_id:this.user.user_id,
      post_id:id,
      Positive:1,
     

    };
   var index=0;
    this.uservoted=this.Vote.map((data:any)=>data.user_id);
    console.log(this.Vote,'toutela liste');
    console.log(this.uservoted , 'userlist');
    this.postvoted=this.Vote.map((data:any)=>data.post_id);
    console.log(this.postvoted , "postlist ");
    this.voteId=this.Vote.map((data:any)=>data.VoteId);
    console.log(this.voteId);
    console.log(this.Vote[0] , 'test');
    var id ;
    for( let i=0; i<this.Vote.length; i++){
     
      if((val.user_id==this.uservoted[i]) && (val.post_id==this.postvoted[i])){
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
   

    
     
  
  addVoteNegativePoste(id:any){
    var val = {
     
      user_id:this.user.user_id,
      post_id:id,
      Negative:1,
      Positive:0
     

    };
    var index =0;
    var id ;
    this.uservoted=this.Vote.map((data:any)=>data.user_id);
    console.log(this.Vote,'toutela liste');
    console.log(this.uservoted , 'userlist');
    this.postvoted=this.Vote.map((data:any)=>data.post_id);
    console.log(this.postvoted , "postlist ");
    this.voteId=this.Vote.map((data:any)=>data.VoteId);
    console.log(this.voteId);
    console.log(this.Vote[0] , 'test');
    var id ;
    for( let i=0; i<this.Vote.length; i++){
     
      if((val.user_id==this.uservoted[i]) && (val.post_id==this.postvoted[i])){
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
    return this.PostList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  FilterFn(){
    var pubsubjectfilter=this.pubsubjectfilter

    this.PostList = this.PostListWithoutFilter.filter(function (el : any){
        return el.pubsubject.toString().toLowerCase().includes(
          pubsubjectfilter.toString().trim().toLowerCase()
        )
    });
  }
  sortResult(prop : any,asc : any){
    this.PostList = this.PostListWithoutFilter.sort(function(a: any,b: any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
  

}

