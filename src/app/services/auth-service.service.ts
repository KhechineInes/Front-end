import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const httpOptions ={
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
api_url = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }


  login(username: string, password: string){

    return this.http.post<any>( this.api_url + `/api/auth/` ,
    {username, password}, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  }
  changePassword(username: string, password: string){
    return this.http.post<any>(this.api_url+ '/password/change/' , {username, password}, httpOptions).pipe()
  }
}



