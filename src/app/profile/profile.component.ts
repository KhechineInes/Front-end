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
  PostList: any;
  PubId: number=0;
  pub: string="";
  pubsubject:string="";
  ModalTitle: string ="";
  user:any;
  val:string="";
 ansList:any;
  ActivateAddEditPostComp:boolean=false;
  ActivateAddEditAnsComp: boolean=false;
  ans: any;
  post:any;
  ImagePath:any;
  Image:any;
  User:any;
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    
    console.log(this.user);
    this.getPostList();
    this.ImagePath=this.service.PhotoUrl+this.Image;
    
  }
  uploadPhoto(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.Image=data.toString();
      this.ImagePath=this.service.PhotoUrl+this.Image;
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
      this.PostList=data,
      console.log(this.PostList)}
    );
    
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
 
}
