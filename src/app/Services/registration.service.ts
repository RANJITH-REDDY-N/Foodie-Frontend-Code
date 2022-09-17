import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from 'src/model/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<Registration[]>{
    return this.http.get<Registration[]>("http://localhost:8080/api/grill/");
  }

  postUser(data:Registration):Observable<Registration>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //   })
    // };
    return this.http.post<Registration>("http://localhost:8080/api/grill/register",data);
  }
}
