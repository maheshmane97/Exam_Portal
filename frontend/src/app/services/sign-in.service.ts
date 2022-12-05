import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL="http://localhost:8084"
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  
  constructor(private http:HttpClient) { }

    //CurrentUser which is logged in
  public getCurrentUser(){
    return this.http.get(API_URL+"/current-user");
  }

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

  //Logout: remove token from local storage
  public signOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get Token
  public getToken(){
    return localStorage.getItem("token")
  }

  //set UserDetails
  public setUser(user:any){
    return localStorage.setItem("user", JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.signOut();
      return null;
    }
  }

  //get UserRole
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
