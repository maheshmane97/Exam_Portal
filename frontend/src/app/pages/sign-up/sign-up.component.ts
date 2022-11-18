import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private userServeice:UserService, private snackBar:MatSnackBar) { }

  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    profile:''
  }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.userName=='' || this.user.userName == null){
      // alert("User Name is Required..!")
      this.snackBar.open("UserName is Required.!!", "OK", {
        duration:2000,
      })
      return;
    }
    //userServiceCall
    this.userServeice.addUSer(this.user).subscribe(
      (response)=>{
        console.log(response);
       // alert("Successfully Registered..!")
       Swal.fire("REGISTERED..!!", "User Successfully Registered  "+ this.user.firstName, "success");
      },
      (error)=>{
        console.log(error);
        // alert("Somethings wents Wrong..!")
        this.snackBar.open("Something Wents Wrong.!!", "OK", {
          duration:2000,
        })
      }
    );
  }

}
