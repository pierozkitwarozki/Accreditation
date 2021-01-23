import { Component, OnInit } from '@angular/core';
import { UserToReturn } from '../_models/userToReturn';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  loggedUser: UserToReturn = JSON.parse(localStorage.getItem('user'));
  
  constructor() { }

  ngOnInit(): void {
  }

}
