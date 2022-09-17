import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/grill/");
  }
  
  login( user:Login ) {
    return this.http.put("http://localhost:8080/api/grill/login",user);
  }

  AuthLogin( user:Login ) {
    return this.http.put("http://localhost:8080/login",user);
  }

  logout( user: Login ):any {
    return this.http.put("http://localhost:8080/api/grill/logout",user)

  }

}
