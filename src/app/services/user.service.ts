import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/registerUser';
import { User } from '../models/response/user';
import { UserIdentity} from '../models/response/userIdentity';
import { UserSignIn } from '../models/user-signin';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private httpService: HttpService) { }

  registerUser(registerUserRequest: RegisterUser): Observable<User>
  {
    return this.httpService.post<User>('users/register', registerUserRequest, false);
  }

  userSignIn(signInUserRequest: UserSignIn): Observable<UserIdentity>
  {
    return this.httpService.post<UserIdentity>('users/signin', signInUserRequest, false);
  }
}
