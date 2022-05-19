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


  constructor(private service: SharedService) { }

  @Input() user: any;
  id:number=0;
 

  username:string = "";

  password:string = "";
  posts: string ="";
  
  date_joined! : Date 
  email : string = "";



  ngOnInit(): void {
    
  }

  addUser() {
    var val = {
     
     id:this.id,

      username:this.username,
    
      password:this.password,
     
      email : this.email,
      last_login : this.last_login,
      date_joined : this.date_joined 
      
    
    };
    this.service.addUser(val).subscribe(res => {
      alert(res.toString());
    });
    
  }

  updateUser() {
    var val = {

     
      
    };
    this.service.updateUser(val).subscribe(res => {
      alert(res.toString());
    });
    console.log(val)
  }

}