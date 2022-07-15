import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/registerUser';
import { User } from '../models/response/user';
import { UserIdentity} from '../models/response/userIdentity';
import { UserSignIn } from '../models/user-signin';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  registerUser(registerUserRequest: RegisterUser): Observable<User>
  {
    return this.http.post<User>(this.baseApiUrl+'/users/register', registerUserRequest);
  }

  userSignIn(signInUserRequest: UserSignIn): Observable<UserIdentity>
  {
     return this.http.post<UserIdentity>(this.baseApiUrl+'/users/signin', signInUserRequest);
  }
}
