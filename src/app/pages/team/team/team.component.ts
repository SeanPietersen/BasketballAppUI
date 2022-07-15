import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/response/team';
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

  constructor(private route: ActivatedRoute, 
    private teamService: TeamService, 
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
            }
          })
        }
      }
    })
  }

}
