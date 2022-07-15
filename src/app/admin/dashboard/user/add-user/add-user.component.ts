import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  last_login: any;
  Education: any;
  Function: any;
  Address: any;
  MobileNumber: any;
  Image: any;
userlist:any=[];
  ImagePath: string="";
ActivateModal: boolean=false;
  constructor(private service: SharedService) { }

  
  id:number=0;
 

  username:any;

  password:any;

  

  email : any;



  ngOnInit(): void {
    this.ImagePath=this.service.PhotoUrl+this.Image;
  }

  addUser() {
    var val = {
      id:this.id,
      username:this.username,
      password:this.password,
      email : this.email,
      
      
    };
    this.service.addUser(val).subscribe(res => {
      alert("Added Successfully!!!");
      this.userlist=res 
    });
    
  }
  closeClick(){
    this.ActivateModal=false;
  
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

