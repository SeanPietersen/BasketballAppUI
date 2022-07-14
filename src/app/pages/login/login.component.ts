import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
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
    if(this.signInForm.valid){
      alert('Form submitted succesfully');
      console.table(this.signInForm.value);
    }
    //checkInputs(this.userDetail.Email, this.userDetail.Password);

  }
}
