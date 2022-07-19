import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignIn } from 'src/app/models/user-signin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm!: FormGroup;
  submitted = false;

  userSignInInformation: UserSignIn = {
    email: '',
    password: ''
  }



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get signInFormControl(){
    return this.signInForm.controls;
  }

  validateUserSignIn()
  {
    this.submitted = true;
    var error = 0;
    
    Object.keys(this.signInForm.controls).forEach(key => {
      if(this.signInForm.get(key)?.invalid){
        error ++;
      }
    })

    if (error === 0) 
    {
      this.userSignInInformation.email = this.signInForm.value.email;
      this.userSignInInformation.password = this.signInForm.value.password;


      this.userService.userSignIn(this.userSignInInformation)
      .subscribe({
        next:(userIdentityToken) =>{
          //updating the authentication service with the user information and identity token
          this.authenticationService.updateUserIdenity(userIdentityToken);
          this.router.navigate(['admin/dashboard'])
        },
        error:(response) => {
          alert("an error occured trying to sign in the user");
        }
      })
    }
  }
}
