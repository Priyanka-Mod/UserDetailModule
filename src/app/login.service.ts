import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from './datatype.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  userLogIn(data:LogIn){
    return this.http.post('http://localhost:3000/login',data)
  }
}
