import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/response/user';
import { UserIdentity } from 'src/app/models/response/User-identity';
import { UserSignIn } from 'src/app/models/user-signin';
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

  userTosignInReturnValues: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  userWithIdentityTokenReturned: UserIdentity = {
    user: this.userTosignInReturnValues,
    identityToken: ''
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService
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
          this.userWithIdentityTokenReturned.user = userIdentityToken.user;
          this.userWithIdentityTokenReturned.identityToken = userIdentityToken.identityToken;
          console.table(this.userWithIdentityTokenReturned);
        },
        error:(response) => {
          alert("an error occured trying to sign in the user");
        }
      })
    }
  }
}
