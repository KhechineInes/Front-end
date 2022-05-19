import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ans',
  templateUrl: './ans.component.html',
  styleUrls: ['./ans.component.css']
})
export class AnsComponent implements OnInit {
ansList : Answer[] =[];

  constructor(private service:SharedService) { }
  @Input()post :any;
  
  AnsId : number =0;
  Ans :string ="";
  date! : Date;
  
  pub_id : number =0;
  user:any;
  ngOnInit() {
    
  }
  addAns(){
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    var val = {AnsId:this.AnsId,
               Ans:this.Ans,
               date:this.date,
               user:this.user.user_id,
               pub_id:this.post.pubId
               };
    this.service.addAns(val).subscribe(res=>{
      alert(res.toString());
      
      console.log(val);
    });
  }
  refreshAnsList() {
    this.service.getAnsList().subscribe(data=>{
      this.ansList=data;
    
    });
  }
}

