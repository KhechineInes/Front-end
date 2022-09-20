import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule , FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;
  username: string = "";
  Password: string = "";
  myform!: FormGroup;
  password: any;
  msg : any;
  userList: User[]=[];
  constructor(private authService : AuthServiceService, private service : SharedService, private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void { 
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    }
    get f(){
      return this.myform.controls; 
  }
  onSubmit(){
    console.log(this.myform)
    this.authService.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(data=>{
     if (data.toString()!="Invalid username or password !!!") {
      alert("Welcome "+this.f['username'].value);
      this.user=data;
    
      
     }
     else alert(data.toString());
     this.router.navigate(['/admin/dashboard']);
    })
   
   
   
  }
  loginclick() {
    if ((this.f['username'].value != "admin" )||(this.f['password'].value ==0)){
      alert('Invalid username or your password !!!!');

    
      
    

    }else{this.onSubmit();
    
    }
    
    
      
    }
}
