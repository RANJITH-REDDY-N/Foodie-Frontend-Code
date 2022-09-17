import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Registration } from 'src/model/registration';
import Swal from 'sweetalert2';
import { RegistrationService } from '../Services/registration.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private rs:RegistrationService,private route:Router) {}
  registrationform: FormGroup = new FormGroup({
    'username' : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z_ ]{3,20}$")]),
    'email' : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    'phone' : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'password':new FormControl('',Validators.required)
  });
  
  UserObj:Registration = new Registration();
  UsersArray:Registration[] = [];

  ngOnInit() {
    this.getUserRecords();
  }

  getUserRecords(){
    this.rs.getUsers().subscribe((userRecords)=>{
      this.UsersArray = userRecords;
    })
  }

  userExists(username:string):boolean {
    return this.UsersArray.some((el)=> {
      return el.username === username;
    }); 
  }
  emailExists(email:string):boolean {
    return this.UsersArray.some((el)=> {
      return el.email === email;
    }); 
  }

  postUserRecord(data:any){
    if(this.registrationform.invalid){
      Swal.fire(
        'Sign Up?',
        'Fill all the Required Fields.',
        'question'
      )
    }
    else if(this.userExists(this.UserObj.username)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'UserName Already Exists!',
      })
    }
    else{
      this.rs.postUser(data).subscribe((userRecord)=>{
        this.UsersArray.push(userRecord);
        Swal.fire(
          'Registered Successfully!',
          'Lets Login!',
          'success'
        )
        var i = document.getElementById('clr');
        i?.click();
        this.UserObj = new Registration();
        this.route.navigate(['/login']);
    },
    (error: any) => 
      {
        console.log(error)
        if (error.status == 0) 
        {
          Swal.fire({
            title: 'Oops...',
            text: 'Unknown Error!',
          })
        }
      });
    
  }
  }
}
