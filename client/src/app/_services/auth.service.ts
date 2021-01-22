import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserToLogin } from '../_models/userToLogin';
import { UserToRegister } from '../_models/userToRegister';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserToReturn } from '../_models/userToReturn';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.api + 'auth/';
  constructor(private http: HttpClient) {}

  register(userToRegister: UserToRegister) {
    return this.http.post(
      this.url + 'register/',
      userToRegister
    );
  }

  login(userToLogin: UserToLogin): Observable<UserToReturn> {
    return this.http.post<UserToReturn>(this.url + 'login', userToLogin).pipe(
      map((response: UserToReturn) => {
        if (response) {
          const user: UserToReturn = response;
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          return response;
        }
      })
    );
  }
}
