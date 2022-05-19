import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  
  UserId: any;
  username:string="";
  constructor() { }
  @Input() user:any;
  ngOnInit(): void {
    this.UserId = this.user.UserId;
    this.username = this.user.username;
    
  }

}
