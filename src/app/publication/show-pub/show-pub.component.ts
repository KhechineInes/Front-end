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
  VoteId:any;
  ActivateModal: boolean=false;
  voteduserList:any=[];
  voteduser:any=[];
  voteddisuser: any=[];
  ActivatedisModal: boolean=false;
  constructor(private service:SharedService) { }
 
  ModalTitle: string ="";
  ActivateAddEditPostComp:boolean=false;
  post:any;
  user:any;
  ImagePath:string = "";
  PostIdFilter:string="";
  PostNameFilter:string="";
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
    

    
  }
  getVote(){
    this.service.getVote().subscribe((data) => {
      this.VotePosListData=data
         
           }
        )
        this.ImagePath=this.service.PhotoUrl+this.Image;
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
    
    this.service.addVote(val).subscribe(res => {
      alert(res.toString());
      this.getVote();
      this.liked=1;
    });
  
     
  }
  addVoteNegativePoste(id:any){
    var val = {
     
      user_id:this.user.user_id,
      post_id:id,
      Negative:1,
      Positive:0
     

    };
    
    this.service.addVote(val).subscribe(res => {
      alert(res.toString());
      this.getVote()
    });
  }
  get sortData() {
    return this.PostList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  FilterFn(){
    var PostIdFilter = this.PostIdFilter;
    var PostNameFilter = this.PostNameFilter;

    this.pubId = this.PostListWithoutFilter.filter(function (el : any){
        return el.pubId.toString().toLowerCase().includes(
          PostIdFilter.toString().trim().toLowerCase()
        )&&
        el.pub.toString().toLowerCase().includes(
          PostNameFilter.toString().trim().toLowerCase()
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

