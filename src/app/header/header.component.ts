import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:any;
  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    
  }
logout(){
  this.auth.logout();

}
}
