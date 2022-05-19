import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-homedev',
  templateUrl: './homedev.component.html',
  styleUrls: ['./homedev.component.css']
})
export class HomedevComponent implements OnInit {
user:any;
  constructor(private authservice: AuthServiceService , private ser : SharedService, private router: Router) { }

  ngOnInit(): void {
 this.verification();

  }
  verification(){
   
    if(localStorage.length==0) {
      
      console.log("'not loggedin'")
    }else{
      this.router.navigate(['/welcome']);
    }
  }
  }




