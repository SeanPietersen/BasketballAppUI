import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/response/team';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService){ }

  get<TResponse>(url: string, identityToken: boolean): Observable<TResponse>
  {
    if(identityToken)
    {
      var token = "bearer "+this.authenticationService.getUserIdentityToken();

      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
      };
      return this.http.get<TResponse>(this.baseApiUrl+'/'+ url, httpOptions);
    }
    return this.http.get<TResponse>(this.baseApiUrl+'/'+ url);
  }

  post<TResponse>(url: string, body: any, userIdentityToken: boolean): Observable<TResponse>{
    if(userIdentityToken)
    {
      var token = "bearer "+this.authenticationService.getUserIdentityToken();

      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
      };

      return this.http.post<TResponse>(this.baseApiUrl+'/'+ url, body, httpOptions);
  }
  return this.http.post<TResponse>(this.baseApiUrl+'/'+ url, body);
}
}
