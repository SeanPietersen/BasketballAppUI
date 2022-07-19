import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTeam } from 'src/app/models/createTeam';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  
  addTeamRequest: CreateTeam = {
    name: '',
    state: ''    
  }

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
  }


  addTeam()
  {
    this.teamService.createTeam(this.addTeamRequest)
    .subscribe({
      next: (apiResponseTeam) => {
        if(apiResponseTeam.isSuccess)
        {
          this.router.navigate(['admin/teams']);
        }
        else{
          alert(apiResponseTeam.errors[0]);
        }
      },
      error: (response) => {
        alert("Error uploading team");
      }
    })
  }
}
