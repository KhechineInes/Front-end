import { Component, OnInit } from '@angular/core';
import { Answer, Cat, Post, User } from 'src/app/model';
import {SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-show-pub',
  templateUrl: './show-pub.component.html',
  styleUrls: ['./show-pub.component.css']
})
export class ShowPubComponent implements OnInit {
  PostList: any;
  AnsList: any;
  UserList: User[] =[];
  CatList: Cat[]=[];
  ActivateAddEditAnsComp: boolean=false;
  pubId: any;
  ans: any;
  pub: any;
  constructor(private service:SharedService) { }
 
  ModalTitle: string ="";
  ActivateAddEditPostComp:boolean=false;
  post:any;
  user:any;

  PostIdFilter:string="";
  PostNameFilter:string="";
  PostListWithoutFilter:any=[];
  filePath: string="";
  Image: string ="";


  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.refreshPubList();
    this.filePath=this.service.PhotoUrl+this.pub;
  }
  
  




  refreshPubList() {
    this.service.getPostList().subscribe((data) => {
      this.PostList=data,
      console.log(this.PostList)}
    );
    
  }
  
  addClick(){
    this.ModalTitle="Add Post";
    this.ActivateAddEditPostComp=true;
    this.refreshPubList();

  }
  
  editClick(item: any){
    this.post=item;
    this.ModalTitle="Edit Post";
    this.ActivateAddEditPostComp=true;
   
  }
  closeClick(){
    this.ActivateAddEditAnsComp=false;
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
    console.log(item);
    this.refreshAnsList();
    
   
    
  }
  GetOnePost(data:any, user:any) {
      this.post=data
      this.user=user
  
  console.log(data,'data');
  
  
  
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
      this.PostList=data;
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
