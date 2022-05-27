import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Post, Pub } from 'src/app/model';

import {  ToolbarService,  LinkService,  ImageService,  HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-add-edit-pub',
  templateUrl: './add-edit-pub.component.html',
  styleUrls: ['./add-edit-pub.component.css']
})
export class AddEditPubComponent implements OnInit {
  private rteValue: string = `<p>The Rich Text Editor component is a WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
  <p><b>Key features:</b></p>
  <ul>
      <li>
          <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
      </li>
      <li>
          <p>Capable of handling markdown editing.</p>
      </li>
  </ul>`;
  [x: string]: any;
formValue !: FormGroup;

  formBuilber: any;
  PostList: Post[]=[];


  constructor(private service:SharedService) { }
  @Input() Post:any;
  @Input() Cat:any;
  @Input() ng :any;
  PubId: string="";
  pub: string="";
  pubsubject:string="";
  user:any = localStorage.getItem("Currentuser");
  pubId:number=0;
  user_id:number = 0;
  cat:any;
  cat_id:number = 0;
  answer:any;
  date!:Date;
  filePath:string="";
  ngOnInit(): void {
console.log(this.ng);
    console.log(this.Post);
    this.cat_id = this.Post.cat_id;
    this.pubId=this.Post.pubId;
     this.pub=this.Post.pub;
     this.pubsubject=this.Post.pubsubject;
   this.date=this.Post.date;
    this.user_id=this.Post.user_id;
    this.filePath=this.service.PhotoUrl+this.pub;
     
   
  }
  uploadfile(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.pub=data.toString();
      this.filePath=this.service.PhotoUrl+this.pub;
    })
  }
  addPostDetails(){
    this.cat_id= this.Cat;
    console.log(this.cat_id);
    this.user=JSON.parse(localStorage.getItem('currentUser')!);
    var val = { pubId:this.PubId,
                pub:this.pub,
                pubsubject:this.pubsubject,
                user:this.user.user_id,
                cat:this.Cat,
                cat_id: this.Cat

              };
              
            
    this.service.addPost(val).subscribe(res=>{
      alert(res.toString());
  
      console.log(val);
      
    });
    this.refreshPostList();
  }
  refreshPostList() {
    this.service.getPostList().subscribe(data=>{
      this.PostList=data;
    
    });
  }
  updatePost(){
    var val = {
    
     pubId:this.Post.pubId,
      pub:this.pub,
      pubsubject:this.pubsubject,
     
      
      
      
    };
    console.log(val);
    this.service.updatePost(val).subscribe(res=>{
    alert(res.toString());
    });
    this.refreshPostList();
    console.log(val)
  }
/* sendEmail(form: HTMLInputElement): void {
   const code : string =this['_util'].rondomNumber().toString();
   const payload = {
     code : code ,
     message : "New post has been added",
     subject:'New Post', 
     toEmail: "khechine.ines@gmail.com"

   };
   this._http.requestCall(AuthEndpoint.VERIFY_EMAIL, payload, ApiMethod.POST).subscribe((res: { toString: () => any; })=>{
    alert(res.toString());
 });
}*/


}
