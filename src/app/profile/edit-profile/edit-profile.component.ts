import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  
  
  username: string = "";
  Address:string = "";
  Function:string = "";
  Education:string = "";
  email: string = "";
  first_name: string = "";
  last_name: string = "";
  option: string="";
  Image: string = "";
  ImagePath:string = "";
  User:any;
  MobileNumber: number=0;
  date_joined: any;
  last_login: any;
  account: any;
  owner: any;
  userlist: any;
  id:any;
  editpass:any;
  editphoto:any;
  old_password:any;
  new_password:any;
  constructor(private service: SharedService , private auth:  AuthServiceService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
   
    this.username=this.user.username,
    this.email=this.user.email,
    this.first_name=this.user.first_name,
    this.last_name=this.user.last_name,
  
    
    this.Function=this.user.Function,
   
    
    console.log(this.user);
    
    
    this.ImagePath=this.service.PhotoUrl+this.Image;
    
    this.getUser();
  }

  updateUser(){
    var val = {
  
    
    user: this.user=JSON.parse(localStorage.getItem('currentUser')!),
   
    Education:this.Education,
    Function:this.Function,
    Address:this.Address,
    MobileNumber:this.MobileNumber,
   }
    
   


      
    
    console.log(val);
    this.service.updateProfile(val).subscribe(res=>{
    alert(res.toString());
      
   });
  }
  setPass(){
    var val={
      user:this.user=JSON.parse(localStorage.getItem('currentUser')!),
      username:this.username,
    old_password:this.old_password,
  new_password:this.new_password
    }
    this.auth.setpass(val).subscribe(res=>{
      alert(res.toString());
    })
  }
Editpassword(){
  if(this.editpass==undefined){this.editpass=1;
  
  }
  else {this.editpass=undefined}
  
}
EditPhoto(){
  if(this.editphoto==undefined){this.editphoto=1;}
  else {this.editphoto=undefined}
  
}


  changeclick(){
    this.option="profile";
  }
  anuulClick(){
    this.option="";
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
  getUser() {
    this.service.getUserList().subscribe((data) => {
      this.userlist=data.filter((res:any)=>res.id==this.user.user_id),
      console.log(this.userlist)}
    );
    this.ImagePath=this.service.PhotoUrl+this.user.Image;
  }
}
