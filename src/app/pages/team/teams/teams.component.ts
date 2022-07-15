import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/response/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams()
    .subscribe({
      next: (teams) => {
        this.teams= (teams);
      },
      error: (response) => {
        alert("Teams was not added");
      }
    })
  }

}
