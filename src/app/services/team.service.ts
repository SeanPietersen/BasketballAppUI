import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Team } from '../models/response/team';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllTeams(): Observable<Team[]>
  {
    return this.httpService.get<Team[]>('teams', true);
  }

  getTeamById(id: number): Observable<Team> {
    return this.httpService.get<Team>(`teams/${id}`, true);
  }
}
