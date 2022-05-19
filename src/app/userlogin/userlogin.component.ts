import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormsModule , FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  user: any;
  username: string = "";
  Password: string = "";
  myform!: FormGroup;
  password: any;
  msg : any;
  userList: User[]=[];
  constructor(private authService : AuthServiceService, private service : SharedService, private router: Router, private fb:FormBuilder) { }

  ngOnInit() : void {
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
    alert("Welcome "+this.f['username'].value);
     this.user=data;
    
     console.log(data);
     
     this.router.navigate(['/welcome']);
     
    
   })
   
   
   /*console.warn(this.myform.value);*/
 }
 

  /*login() {
    
this.service.getMessage().subscribe(res=>{
this.msg = res,
console.log(this.msg);

});
  }*/
 
 
 
  
  loginclick() {
    if ((this.f['username'].value == 0 )||(this.f['password'].value ==0)){
      alert('Please enter your username and your password');

    
      
    

    }else{this.onSubmit();
    
    }
    
    
      
    }
  }





