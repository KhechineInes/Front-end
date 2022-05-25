import { Component, Input, OnInit } from '@angular/core';
import { Cat, User  , Post , Answer} from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.css']
})
export class ShowCatComponent implements OnInit {
@Input() Cat:any

  ansList: any;
  PostList: any;
  ActivateAddEditPostComp: boolean= false;
  ActivateAddEditPosComp: boolean = false;
  ActivateAddEditAnsComp : boolean= false;
  CatList: any;
  ImagePath: string="";
 
constructor(private service:SharedService) { }
 post : any;
 user:any
  ModalTitle: string ="";
  ActivateAddEditCatComp:boolean=false;
  cat:any;
  CatId: number = 0;
  CatName: string = "";
  CatFramework: string = "";
  CatLanguage: string = "";
  AdminId: number = 0;
  Image: string = "";
 



  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.CatId=this.Cat.CatId;
    this.CatName=this.Cat.CatName;
    this.CatFramework=this.Cat.CatFramework;
    this.CatLanguage=this.Cat.CatLanguage;
    this.ImagePath=this.service.PhotoUrl+this.Image;
   
   
    this.refreshPubList()
   this.refreshAnsList();
  }

  
  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.ansList=data;
    
    });
  }
  get sortDataAns() {
    return this.ansList.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
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



  addClick(data:any){
    this.cat= data.CatId;
    console.log(this.Cat);
    this.ModalTitle="Add Post";
    this.ActivateAddEditPostComp=true;
    this.refreshPubList();

  }
  ansClick(data:any){
    this.post=data;
    this.ActivateAddEditAnsComp=true;
  }
  
 
  deleteAnsClick(item : any){
    if(confirm('Are you sure??')){
      this.service.deleteAns(item.AnsId).subscribe(data=>{
        alert(data.toString());
        
      })
      this.refreshAnsList();
    }
  }
  deletePostClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deletePost(item.pubId).subscribe(data=>{
        alert(data.toString());
        this.refreshPubList();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditCatComp=false;
    this.refreshPubList() ;
    this.refreshAnsList();
     
  }

 
  
}