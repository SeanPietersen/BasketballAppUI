import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { UserService } from 'src/app/services/user.service';
import {RegisterUser} from 'src/app/models/registerUser'
import { UserSignIn } from 'src/app/models/user-signin';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm!: FormGroup;
  submitted = false;
  registerUserInformation: RegisterUser = {
   firstName: '',
   lastName: '',
   email: '',
   password: ''
  }

  userForSignInValues: UserSignIn = {
    email: '',
    password: ''
  }




  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    var error = 0;
    Object.keys(this.registerForm.controls).forEach(key => {
      if(this.registerForm.get(key)?.invalid){
        error ++;
      }
    })

    if (error === 0) 
    {
      this.registerUserInformation.firstName = this.registerForm.value.firstName;
      this.registerUserInformation.lastName = this.registerForm.value.lastName;
      this.registerUserInformation.email = this.registerForm.value.email;
      this.registerUserInformation.password = this.registerForm.value.password;

      this.userService.registerUser(this.registerUserInformation)
      .subscribe({
        next: (user) => {
          this.userForSignInValues.email = user.email;
          this.userForSignInValues.password = user.password;

          this.userService.userSignIn(this.userForSignInValues)
          .subscribe({
            next:(userIdentityToken) =>{
              this.authenticationService.updateUserIdenity(userIdentityToken);
              // console.table(this.userWithIdentityTokenReturned);
              this.router.navigate(['dashboard'])
            },
            error:(response) => {
              alert("an error occured trying to sign in the user");
            }
          })
        },
        error:(response) => {
          alert("an error occured trying to enter the user register details");
        }
      })
    }
  }
}

