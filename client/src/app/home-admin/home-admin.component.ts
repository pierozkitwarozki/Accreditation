import { Component, OnInit } from '@angular/core';
import { UserToReturn } from '../_models/userToReturn';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  loggedUser: UserToReturn = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit(): void {
  }

}
