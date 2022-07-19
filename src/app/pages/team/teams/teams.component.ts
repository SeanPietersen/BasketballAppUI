import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/response/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamService: TeamService,
              private router: Router) { }

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

  addNewTeam()
  {
    this.router.navigate(['admin/addTeam'])
  }

}
