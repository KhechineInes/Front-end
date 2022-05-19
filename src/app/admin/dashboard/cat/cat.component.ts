import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  CatList: Cat[] =[];
  cat : any ;
  Image: string ="";
 
  ModalTitle: string ="";
  ActivateAddEditComp:boolean=false;
  
  ImagePath: string="";
    constructor(private service: SharedService) { }
  
  
    ngOnInit(): void { 
      this.refreshCatList();
      this.ImagePath=this.service.PhotoUrl+this.Image;
     
    }
  
    refreshCatList() {
      this.service.getCatList().subscribe((data:Cat[]) => 
        this.CatList=data
       
       
      );
      
    }
    
    
    addClick(){
      this.cat={
        CatId:0,
        CatName:"",
        CatFramework:"",
        CatLang:"",
        Image:"",
        
    
      
      }
      this.ModalTitle="Add Category";
      this.ActivateAddEditComp=true;
      this.refreshCatList();
  
    }
    
    editClick(item: any){
      console.log(item);
      this.cat=item;
      this.ModalTitle="Edit Category";
      this.ActivateAddEditComp=true;
      this.refreshCatList();
    }
    deleteClick(item : any){
      if(confirm('Are you sure??')){
        this.service.deleteCat(item.CatId).subscribe(data=>{
          alert(data.toString());
          this.refreshCatList();
        })
      }
    }
    closeClick(){
      this.ActivateAddEditComp=false;
      this.refreshCatList();
    }
    
    

    
}
