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
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        var intIdNumber:number = +id!;

        if(intIdNumber) {
          this.teamService.getTeamById(intIdNumber)
          .subscribe({
            next: (response) => {
              this.teamDetails = response;
              this.playerService.getAllPlayersForTeam(this.teamDetails.teamId)
              .subscribe({
                next: (players) => {
                  this.players= (players);
                },
                error: (response) => {
                  alert("Players were not found");
                }
              })
            }
          })
        }
      }
    })
  }

}
