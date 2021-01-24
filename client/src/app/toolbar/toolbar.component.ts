import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return localStorage.getItem('acc_token') !== null;
  }

  redirect() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      if (user.role === 'Admin') {
        this.router.navigateByUrl('/admin');
      } else if (user.role === 'User') {
        this.router.navigateByUrl('/user');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
