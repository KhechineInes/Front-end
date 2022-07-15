import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[] = [];
  ModalTitle: string = "";
  ActivateAddEditComp: boolean = false;
  user: any=[];
  ActivateShowComp: boolean = false;
  ImagePath: string="";
  Image: string="";
  ActivateEditComp: boolean = false;
  ActivateComp : boolean = false;
  Education: any;
  Function: any;
  Address: any;
  MobileNumber: any;
  id:any;
 
  constructor(private service: SharedService) { }


  ngOnInit(): void {
    this.refreshUserList();
    this.ImagePath=this.service.PhotoUrl+this.Image;
  }
  refreshUserList() {
    this.service.getUserList().subscribe((data =>
      this.user = data));

    

  }
  addClick() {
   
    this.ModalTitle = "Add User";
    this.ActivateAddEditComp = true;

  }
  editClick(item: any) {
    this.user = item;
    this.ModalTitle = "Edit User";
    this.ActivateEditComp = true;
  }
  showClick(item: any) {
  this.ActivateShowComp=true;
  this.user = item; 
  }
  closeClick() {
    this.ActivateAddEditComp = false;
    
    this.refreshUserList();
  }
  close2Click() {
 
    this.ActivateShowComp=false;
    this.refreshUserList();
  }
  close3Click() {
    
    this.ActivateEditComp = false;
    
    this.refreshUserList();
  }
  activateClick(item:any){
    this.ActivateComp=true;
    this.id=item
      

    }

  
  activateAccount(){
    var val2={
      account:this.id,
      Education:this.Education,
      Function:this.Function,
      Address:this.Address,
      MobileNumber:this.MobileNumber,
      Image:this.Image
    }
    this.service.AddProfile(val2).subscribe(res=>{
      alert(res.toString())
      this.refreshUserList();
     this.ActivateComp=false;
    });
    
  }
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteUser(item).subscribe(data => {
        alert(data.toString());
        this.refreshUserList();
      })
    }
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
