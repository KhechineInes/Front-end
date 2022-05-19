import { Component, Input, OnInit } from '@angular/core';
import { Cat } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  CatList: Cat[]=[];

  constructor(private service:SharedService) { }

  @Input() cat :any;
  CatId: number =0;
  CatName : string ="";
  CatFramework : string ="";
  CatLang : string ="";
  Image:string ="";
  ImagePath:string="";

  
  

  ngOnInit(): void {
    this.CatId = this.cat.CatId;
    this.CatName = this.cat.CatName;
    this.CatFramework=this.cat.CatFramework;
    this.CatLang=this.cat.CatLang;
    this.Image = this.cat.Image;
    this.ImagePath=this.service.PhotoUrl+this.Image;
    
    
    
  }

  addCat(){
    var val = {
                CatName:this.CatName,
                CatFramework:this.CatFramework,
                CatLang:this.CatLang,
                Image:this.Image,
                
              };
    this.service.addCat(val).subscribe(res=>{
      alert(res.toString());
      this.refreshCatList();
    });
  }

  updateCat(){
    var val = {
      CatId:this.cat.CatId,
      CatName:this.CatName,
      CatFramework:this.CatFramework,
      CatLang:this.CatLang,
      Image:this.Image
      
    };
    this.service.updateCat(val).subscribe(res=>{
    alert(res.toString());
    this.refreshCatList();
    });
  }
  refreshCatList() {
    this.service.getCatList().subscribe((data:Cat[]) => 
      this.CatList=data
     
    );
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
  
 
  
 
}

