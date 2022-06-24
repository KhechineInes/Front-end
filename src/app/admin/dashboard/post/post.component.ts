import { Component, OnInit } from '@angular/core';
import { Answer, Cat, User } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  PostList:any=[];
  AnsList: Answer[] = [];
  UserList: User[]=[];
  CatList: Cat[]=[];
  ActivateAddEditPostComp: boolean= false;
  user: any;
  constructor(private service:SharedService) { }
  pos:string ="";
  post:any;

  PostIdFilter:string="";
  PostNameFilter:string="";
  PostListWithoutFilter:any=[];
  ngOnInit(): void {
    this.refreshPubList();
  }
  
  refreshPubList() {
    this.service.getPostList().subscribe((data) => 
      this.PostList=data
    );
  }
  get sortData() {
    return this.PostList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
 
  
 
  deleteClick(item : any){
    if(confirm('Are you sure??')){
      this.service.deletePost(item.pubId).subscribe(data=>{
        alert(data.toString());
        this.refreshPostList();
      })
    }
  }
  
  showClick(item:any,user:any) {
    this.GetOnePost(item,user);
   
    
  }
  GetOnePost(data:any, user:any) {
      this.post=data
      this.user=user
  
  console.log(data,'data');
  
  
  
    this.ActivateAddEditPostComp=true;

}
  refreshPostList(){
    this.service.getPostList().subscribe(data=>{
      this.PostList=data;
      this.PostListWithoutFilter=data;
    });
  }
  closeClick1(){
    this.ActivateAddEditPostComp=false;
    this.refreshPostList();
  }
  FilterFn(){
    var PostIdFilter = this.PostIdFilter;
    var PostNameFilter = this.PostNameFilter;

    this.PostList = this.PostListWithoutFilter.filter(function (el : any){
        return el.PostId.toString().toLowerCase().includes(
          PostIdFilter.toString().trim().toLowerCase()
        )&&
        el.post.toString().toLowerCase().includes(
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
