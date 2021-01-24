import { Component, OnInit } from '@angular/core';
import { ApplicationToReturn } from '../_models/applicationToReturn';
import { UserToReturn } from '../_models/userToReturn';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  loggedUser: UserToReturn = JSON.parse(localStorage.getItem('user'));
  applicationsNonApproved: ApplicationToReturn[];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService.getNonApproved().subscribe((data) => {
      this.applicationsNonApproved = data;
    });
  }
}
