import { Component, OnInit } from '@angular/core';
import { Answer, Cat, Post, User } from 'src/app/model';
import { ShowPubComponent } from 'src/app/publication/show-pub/show-pub.component';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  PostList:any;
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
  dash(){
    this.pos="dash";  }
userClick(){
  this.pos="user";
}
catClick(){
  this.pos="cat";
}
statClick(){
  this.pos="stat";
}
  refreshPubList() {
    this.service.getPostList().subscribe((data) => 
      this.PostList=data
    );
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
