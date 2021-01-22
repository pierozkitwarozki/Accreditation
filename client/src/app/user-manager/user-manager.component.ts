import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { UserToReturn } from '../_models/userToReturn';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
})
export class UserManagerComponent implements OnInit {
  users: UserToReturn[] = [];
  selectedUsers: UserToReturn[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      debugger;
      this.users = data;
    },
    (error) => {
      this.alertify.error(error);
    })
  }

  deleteSelected() {
   this.alertify.confirm('Czy na pewno chcesz usunąć następującą liczbę użytkowników: ' + this.selectedUsers.length, () => {
     for(let i=0; i<this.selectedUsers.length; i++) {
       this.userService.deleteUser(this.selectedUsers[i].id).subscribe((next) => {
         this.alertify.message('Usunięto.');
       }, (error) => this.alertify.error(error));
     }
   })
  }
}
