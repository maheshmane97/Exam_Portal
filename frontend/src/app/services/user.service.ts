import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL="http://localhost:8084/examServer"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  //ADD_USER
  addUSer(user:any){
    return this.http.post(API_URL+"/user", user)
  }
}
