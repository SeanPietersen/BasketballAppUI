import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/response/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserIdentity();
  }

}
