import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  
 
  
  userlist: any;
  id:any;
  editpass:any;
  editphoto:any;
  old_password:any;
  new_password:any;
  constructor(private service: SharedService , private auth:  AuthServiceService ,  private router: Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    this.getUser();
    this.ImagePath=this.service.PhotoUrl+this.Image;
   
    this.username=this.user.username,
    this.email=this.user.email,
    this.first_name=this.first_name,
    this.last_name=this.last_name,
    this.Function=this.user.Function,
    this.Education=this.Education,
    this.Address=this.Address,
    
    this.MobileNumber=this.MobileNumber;
    
    console.log(this.user);
    
    
    
    
  }

  updateUser(){
    var val = {
  
    
    user: this.user=JSON.parse(localStorage.getItem('currentUser')!),
    
    account:this.user.user_id,
    Education:this.Education,
    Function:this.Function,
    Address:this.Address,
    MobileNumber:this.MobileNumber,
    Image:this.Image
   }
    
   


      
    
    console.log(val);
    this.service.updateProfile(val).subscribe(res=>{
    alert(res.toString());
    this.getUser() 
   });
   var val2={
    user: this.user=JSON.parse(localStorage.getItem('currentUser')!),
    username:this.user.username,
    email:this.user.email,
    first_name:this.first_name,
    last_name:this.last_name,
   }
   this.service.updateUser(val2).subscribe(res=>{
    alert(res.toString());
   console.log(this.getUser(),'updated') ;this.getUser() ;
   });
   
}
  updateImage() {
    var val={
      Image:this.Image,
      account:this.user.user_id,
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
  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.Image=data.toString();
      this.ImagePath=this.service.PhotoUrl+this.Image;
    })
  }
  setPass(){
    var val={
      user:this.user=JSON.parse(localStorage.getItem('currentUser')!),
      username:this.username,
    old_password:this.old_password,
  new_password:this.new_password
    }
    this.auth.changePassword(val).subscribe(res=>{
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
  
  getUser() {
    this.service.getUserList().subscribe((data) => {
      this.userlist=data.filter((res:any)=>res.id==this.user.user_id),
      console.log(this.userlist)}
    );
   
  }
}
