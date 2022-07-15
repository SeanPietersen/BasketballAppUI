import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Team } from '../models/response/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]>
  {
    return this.http.get<Team[]>(this.baseApiUrl+'/teams');
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(this.baseApiUrl+'/teams/'+id);
  }
}
