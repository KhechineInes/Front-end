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

  
  id:number=0;
 

  username:any;

  password:any;

  

  email : any;



  ngOnInit(): void {
    this.addUser();
  }

  addUser() {
    var val = {
      username:this.username,
      password:this.password,
      email : this.email,
    };
    this.service.addUser(val).subscribe(res => {
      alert(res.toString());
    });
    console.log(val);
    
  }

}