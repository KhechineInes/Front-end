import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  myform!: FormGroup;

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
    changepass(){
    console.log(this.myform)
    this.authService.changePassword(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(data=>{
     alert("Welcome "+this.f['username'].value);
      
     
      console.log(data);
    })
  }
}
  


