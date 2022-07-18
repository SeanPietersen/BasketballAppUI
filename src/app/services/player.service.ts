import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/response/player';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private httpService: HttpService) { }

  getAllPlayersForTeam(teamId: number): Observable<Player[]> {
    return this.httpService.get<Player[]>(`teams/${teamId}/players`, true);
  }
}
