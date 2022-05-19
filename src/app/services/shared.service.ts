import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post, User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = 'http://127.0.0.1:8000';
readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) { }
  
  
  getPostList():Observable<any[]>{
    return this.http.get<Post[]>(this.APIUrl + '/post/',
    {headers: this.httpHeaders});
  }
  getOneUser(id:number, body:any):Observable<any>{
    return this.http.get<User>(this.APIUrl + '/user/'+`${id}` , body)
  }
  addPost(val:any){
    return this.http.post<any>(this.APIUrl + '/addpost/',val) ; 
  }
  updatePost(val :any){
    return this.http.put(this.APIUrl + '/post/',val); 
  }
  deletePost(val:any){
    return this.http.delete(this.APIUrl + '/post/'+val);
  }
  GetonePost(val:any){
    return this.http.get(this.APIUrl + '/post',val)
  }


  getCatList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/categories/');
  }
  addCat(val:any){
    return this.http.post(this.APIUrl + '/categories/',val);  
  }
  updateCat(val:any){
    return this.http.put(this.APIUrl + '/categories/',val);
  }
  deleteCat(val:any){
    return this.http.delete(this.APIUrl + '/categories/'+val);
  } 
  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SaveFile',val);
  }
 
  

  getAnsList():Observable<any[]>{
    return this.http.get<Post[]>(this.APIUrl + '/ans/');
  }
  addAns(val:any){
    return this.http.post(this.APIUrl + '/ans/' , val);
  }
  updateAns(val:any){
    return this.http.put(this.APIUrl + '/ans/',val);
  }
  deleteAns(val:any){
    return this.http.delete(this.APIUrl + '/ans/'+val);
  }




  getUserList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/user/');
  }
  addUser(val:any){
    return this.http.post(this.APIUrl + '/user/',val);
  }
  updateUser(val:any){
    return this.http.put(this.APIUrl + '/user/',val);
  }
  deleteUser(val:any){
    return this.http.delete(this.APIUrl + '/user/'+val);
  }

  getAllUserNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/user/');
  }

 
  getMessage() {
    return this.http.get(this.APIUrl);
  }
  signin(val:any){
    return this.http.post<any>(this.APIUrl + '/login/', val)
  }
}