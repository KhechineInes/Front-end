import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from '../model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

CatList: any =[];
cat : any ;
ImagePath: string="";
ModalTitle: string ="";
  ActivateAddEditCatComp:boolean=false;
  user: any;
  PostList: any=[];
  Image: string="";
  constructor(private service: SharedService , private router: Router) { }


  ngOnInit(): void { 
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.ImagePath=this.service.PhotoUrl+this.Image;
    this.refreshCatList();
  }

  refreshCatList() {
    
    this.service.getCatList().subscribe(data => 
      this.CatList=data
     
    );
    this.ImagePath=this.service.PhotoUrl+this.Image;
  
}
  showClick(Item:any){
    this.ActivateAddEditCatComp=true;
    this.cat=Item;
   
  }
  
  
  closeClick(){
    this.ActivateAddEditCatComp=false;
    
  }
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.cat.Image=data.toString();
      this.ImagePath=this.service.PhotoUrl+this.cat.Image;
    })
  }
}
