import { Component, OnInit } from '@angular/core';
import { ApplicationToReturn } from '../_models/applicationToReturn';
import { UserToReturn } from '../_models/userToReturn';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {
  loggedUser: UserToReturn = JSON.parse(localStorage.getItem('user'));
  applications: ApplicationToReturn[];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService.getForUser(this.loggedUser.id).subscribe((data) => {
      this.applications = data;
    });
  }
}
