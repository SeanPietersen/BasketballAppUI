import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Team } from '../models/response/team';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAllTeams(): Observable<Team[]>
  {
    var token = "bearer "+this.authenticationService.getUserIdentityToken();
    console.log(this.authenticationService.getUserIdentityToken());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    console.log(httpOptions);
    return this.http.get<Team[]>(this.baseApiUrl+'/teams', httpOptions);
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(this.baseApiUrl+'/teams/'+id);
  }
}
