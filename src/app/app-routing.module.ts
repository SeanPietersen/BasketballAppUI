import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeamComponent } from './pages/team/team/team.component';
import { TeamsComponent } from './pages/team/teams/teams.component';
import { TemplateComponent } from './pages/template/template.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: TemplateComponent,
    // canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'teams',
        component: TeamsComponent
      },
      {
        path: 'teams/:teamId',
        component: TeamComponent
      },
    ]
  },
  
  // {
  //   path: 'dashboard/team/:team',
  //   component: TeamComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
