import { Component, OnInit } from '@angular/core';
import { Answer, Cat, Post, User } from 'src/app/model';
import { ShowPubComponent } from 'src/app/publication/show-pub/show-pub.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  PostList:Post[] = [];
  nb: any;

  constructor(private service: SharedService, private auth: AuthServiceService) { }

  pos: string = "";




  ngOnInit(): void {


  }
 
    
  
  dash() {
    this.pos = "dash";
  }
  userClick() {
    this.pos = "user";
  }
  catClick() {
    this.pos = "cat";
  }
  statClick() {
    this.pos = "stat";
  }



  logout(){
    this.auth.logout();
  
  }











}
