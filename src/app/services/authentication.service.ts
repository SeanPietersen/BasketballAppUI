import { Injectable } from '@angular/core';
import { User } from '../models/response/user';
import { UserIdentity } from '../models/response/userIdentity';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?: User;
  private identityToken?: string;

  constructor() { }

  public updateUserIdenity(userIdentity: UserIdentity): void {
    this.user = userIdentity.user;
    this.identityToken = userIdentity.identityToken;
  }

  public isUserLoggedOn(): boolean {
    if(this.user === null) {
      return false;
    }
    return true;
  }

  public getUserIdentity(): User{
    return this.user!;
  }

  public getUserIdentityToken(): string{
    return this.identityToken!;
  }
}
