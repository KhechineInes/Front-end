import { Component, Input, OnInit, VERSION, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Post, Pub } from 'src/app/model';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';








@Component({
  selector: 'app-add-edit-pub',
  templateUrl: './add-edit-pub.component.html',
  styleUrls: ['./add-edit-pub.component.css'],
  providers: []

})
export class AddEditPubComponent implements OnInit {

  viewMode= '';





  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };















  formValue !: FormGroup;

  formBuilber: any;
  PostList: Post[] = [];
posts:any= [];

  constructor(private service: SharedService) { }
  @Input() set Post(value:any){
    this.posts=value
    this.cat_id = value.cat_id;
  this.pubId = value.pubId;
  this.pub = value.pub;
  this.pubsubject = value.pubsubject;
  this.date = value.date;
  this.user_id = value.user_id;
  }
  @Input() Cat: any;
  @Input() ng: any;
  PubId: string = "";
  pub: string = "";
  pubsubject: string = "";
  user: any = localStorage.getItem("Currentuser");
  pubId: number = 0;
  user_id: number = 0;
  cat: any;
  cat_id: number = 0;
  answer: any;
  date!: Date;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  
};


filePath: string = "";
ngOnInit(): void {
  console.log(this.ng);
  
  this.filePath = this.service.PhotoUrl + this.pub;
  this.editorConfig=this.editorConfig;
}
uploadfile(event: any) {
  var file = event.target.files[0];
  const formData: FormData = new FormData();
  formData.append('uploadedFile', file, file.name);

  this.service.UploadPhoto(formData).subscribe((data: any) => {
    this.pub = data.toString();
    this.filePath = this.service.PhotoUrl + this.pub;
  })
}
addPostDetails() {
  console.log(this.pub,'puu');
  
  this.cat_id = this.Cat;
  console.log(this.cat_id);
  this.user = JSON.parse(localStorage.getItem('currentUser')!);
  var val = {
    pubId: this.PubId,
    pub: this.pub,
    pubsubject: this.pubsubject,
    user: this.user.user_id,
    cat: this.Cat,
    cat_id: this.Cat

  };


  this.service.addPost(val).subscribe(res => {
    alert(res.toString());

    console.log(val);

  });
  this.refreshPostList();
}
refreshPostList() {
  this.service.getPostList().subscribe(data => {
    this.PostList = data;

  });
}
updatePost() {
  var val = {

    pubId: this.posts.pubId,
    pub: this.pub,
    pubsubject: this.pubsubject,




  };
  console.log(val);
  this.service.updatePost(val).subscribe(res => {
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
