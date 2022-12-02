import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL="http://localhost:8084"
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  
  constructor(private http:HttpClient) { }

  //Generate Token
  public generateToken(signInData:any){
     return this.http.post(API_URL+"/generate-token", signInData);
  }

  //LoginUser: set token in LocalStorage
  public signInUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //isLoggedIn: user is logged in or not
  public isLoggedIn(){
    let tokenstr=localStorage.getItem("token");
    if(tokenstr==undefined || tokenstr=="" || tokenstr==null){
      return false;
    }else{
      return true;
    }
  }

  
}
