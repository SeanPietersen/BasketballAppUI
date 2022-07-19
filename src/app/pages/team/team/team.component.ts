import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/response/player';
import { Team } from 'src/app/models/response/team';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamDetails: Team = {
    teamId:0,
    name: '',
    state: ''
  };

  players: Player[] = [];

  constructor(private route: ActivatedRoute, 
              private teamService: TeamService,
              private playerService: PlayerService, 
              private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['teamId'];

    if(id) {
      this.teamService.getTeamById(id)
      .subscribe({
        next: (team) => {
          this.teamDetails = team;
          this.playerService.getAllPlayersForTeam(team.teamId)
          .subscribe({
            next: (playerResponse) => {
              this.players = (playerResponse);
            },
            error: (response) => {
              alert("Players were not found");
            }
          })
        },
        error: (response) => {
          alert("Error getting team");
        }
      })
    }
  }

}
