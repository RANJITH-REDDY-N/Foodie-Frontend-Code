import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/model/login';
import { LoginService } from '../Services/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ls:LoginService,private route:Router) { }
  loginform: FormGroup = new FormGroup({
    'username' : new FormControl('', Validators.required),
    'password' : new FormControl('', Validators.required),
  });
  
  public UserObj:Login = new Login();
  public UsersArray:Login[] = [];

  ngOnInit() {
    this.getUserRecords();
  }

  getUserRecords(){
    this.ls.getUsers().subscribe((userRecords)=>{
      this.UsersArray = userRecords;
    })
  }
  userExists(username:string):boolean {
    return this.UsersArray.some((el)=> {
      return el.username === username;
    }); 
  }
 
  passwordMatches(password:string):boolean {
    return this.UsersArray.some((el)=> {
      return el.password === password;
    }); 
  }

  onLogin():void{
    if(this.loginform.invalid)
    {
      Swal.fire(
        'Log In?',
        'Please fill all the Fields.',
        'question')
    }
    else if(this.userExists(this.UserObj.username)&&this.passwordMatches(this.UserObj.password))
    {
      this.ls.AuthLogin(this.UserObj)
      .subscribe((data:any)=>
      {
        var token = data.token;
        if(token!==null || token!=="" || token!==undefined)
        {
        Swal.fire(
          'Login Successful!',
          'Hello '+this.UserObj.username.toUpperCase()+"👋",
          'success')
        localStorage.setItem("username",this.UserObj.username)
        localStorage.setItem("password", this.UserObj.password)
        this.route.navigate(['/dashboard']);
        this.UserObj = new Login();
        }
      },
      (error: any) => 
      {
        console.log(error)
        if (error.status == 409) 
        {
          Swal.fire('User Already Logged In!')
        }
      })
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Credentials!',
      })
    }
    
  }

}
