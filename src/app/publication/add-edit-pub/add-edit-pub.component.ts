import { Component, Input, OnInit, Pipe, VERSION, ViewChild ,  PipeTransform  } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Post, Pub } from 'src/app/model';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';








@Component({
  selector: 'app-add-edit-pub',
  templateUrl: './add-edit-pub.component.html',
  styleUrls: ['./add-edit-pub.component.css'],
  providers: [],
 

})



export class AddEditPubComponent implements OnInit  {

  viewMode= '';





  config: AngularEditorConfig = {
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
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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
  uploadUrl: 'http://127.0.0.1:8000/media/',
 
  sanitize: true,
  toolbarPosition: 'top',

  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
  }















  formValue !: FormGroup;

  formBuilber: any;
  PostList: Post[] = [];
posts:any= [];
  CatList: any[]=[];
  ImagePath: string='';
  Image: string='';
  ans_id: any;
  Positive: any;
  Negative: any;
  predictList:any=[];
  ActivateModal: boolean=false;
  loader= true;
  http: any;

  constructor(private service: SharedService ,  private router: Router) { }
  public loading = false;
  @Input() set Post(value:any){
    this.posts=value
    this.cat_id = value.cat_id;
  this.pubId = value.pubId;
  this.pub = value.pub;
  this.pubsubject = value.pubsubject;
  this.date = value.date;
  this.user_id = value.user_id;
  }
  @Input() Cat:any;
  @Input() category:number = 0;
  @Input() CatName : string = "";
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
  
  

filePath: string = "";
ngOnInit(): void {
  console.log(this.ng);
  console.log(this.Cat);
  
  
  this.refreshCatList();
  
  this.filePath = this.service.PhotoUrl + this.pub;
  this.config=this.config;
  setTimeout(()=>{                           
    this.loader = true;
}, 10) ; this.loader = false;
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
    this.refreshPostList();
  });
  
  this.router.navigate(['/post']);
}
closeClick(){
  
  this.ActivateModal=false;
 
  this.refreshPostList();
  this.router.navigate(['/post']);
}
usefull(){
  alert('Happy to Serve you !!!! :)');
 
  
}
predict(){
  
  
  this.user = JSON.parse(localStorage.getItem('currentUser')!);
  var val = {
    pubId: this.PubId,
    pub: this.pub,
    pubsubject: this.pubsubject,
    user: this.user.user_id,
    cat: this.Cat,
    cat_id: this.Cat

  };

  this.loading = true;


  this.service.predict(val).subscribe(res => {
    
    if((res.toString()== 'Failed')){
      alert(res.toString());
      this.loading = false;
      this.ActivateModal=false;
      this.router.navigate(['/addpost']);
    }
    else if(res.toString()== 'Not Found') {
      alert(res.toString());
      console.log(this.predictList);
  this.addPostDetails();

}
  else {
      this.ActivateModal=true;
      this.predictList=res;
      this.loading = false;}
    
   
  });
  
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
    cat_id:this.onSelect(this.cat_id)



  };
  console.log(val);
  this.service.updatePost(val).subscribe(res => {
    alert(res.toString());
    this.refreshPostList();
    this.router.navigate(['/post']);
  });
 
  console.log(val)
}
refreshCatList() {
    
  this.service.getCatList().subscribe(data => {
    this.CatList=data,
    console.log(this.CatList)
   
  });


}

onSelect(item:any){
  this.cat_id=item;
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
