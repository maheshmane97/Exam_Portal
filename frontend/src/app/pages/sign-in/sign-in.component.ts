import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInData={
    userName:'',
    password:'',
  };
  constructor(private snack:MatSnackBar, private signIn:SignInService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Sign In Button is clicked..!");
    if(this.signInData.userName=='' || this.signInData.userName == null){
      // alert("User Name is Required..!")
      this.snack.open("UserName is Required.!!", "OK", {
        duration:2000,
      })
      return;
    }
    
    if(this.signInData.password=='' || this.signInData.password == null){
      // alert("User Name is Required..!")
      this.snack.open("Password is Required.!!", "OK", {
        duration:2000,
      })
      return;
    }
    //Request Service to generate token
    this.signIn.generateToken(this.signInData).subscribe(
      (data:any)=>{
          console.log("Success");
          console.log(data); 

          //LogIn..
          this.signIn.signInUser(data.token);

          this.signIn.getCurrentUser().subscribe(
            (user:any)=>{
              this.signIn.setUser(user);
              console.log(user);
              //Redirect if ADMIN on ADMIN dashboard
              //Redirect if NORMAL on Normal dashboard
              
              
            }
          )
      },
      (error)=>{
        console.log("Error..!");
        console.log(error);  
      }
    );
    
  }
}
