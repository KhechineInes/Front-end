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
  user: any;
  ActivateShowComp: boolean = false;
  ImagePath: string="";
  Image: string="";
  ActivateEditComp: boolean = false;
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
    this.user = {
      id: 0,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      
    

    }
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
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteUser(item.id).subscribe(data => {
        alert(data.toString());
        this.refreshUserList();
      })
    }
  }
  

}
