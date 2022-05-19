import { Component, Input, OnInit } from '@angular/core';
import { Cat, Post } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.css']
})
export class AddEditCatComponent implements OnInit {
  catObj:Cat = new Cat();
  PostList: Post[]=[];
  constructor(private service:SharedService) { }
  @Input() cat:any;
  CatId: string ="";
  CatName: string="";
  CatFramework:string ="";
  CatLanguage:string ="";
  Image:string ="";
  ImagePath:string ="";
   
  ngOnInit(): void {
    
    this.CatId=this.cat.CatId;
    this.CatName=this.cat.CatName;
    this.CatFramework=this.cat.CatFramework;
    this.CatLanguage=this.cat.CatLanguage;
    this.Image = this.cat.Image;
    this.ImagePath=this.service.PhotoUrl+this.Image;
  }
  addCat(){
    var val = {CatId:this.CatId,
              CatName:this.CatName,
              CatFramework:this.CatFramework,
              CatLanguage:this.CatLanguage, 
              Image:this.Image,
            
            };
    this.service.addCat(val).subscribe(res=>{
      alert(res.toString());
    });
  }
 
  updateCat(){
    var val = {CatId:this.CatId,
      CatName:this.CatName};
    this.service.updateCat(val).subscribe(res=>{
    alert(res.toString());
    });
  }
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.Image=data.toString();
      this.ImagePath=this.service.PhotoUrl+this.Image;
    })
  }

}


