import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserToReturn } from '../_models/userToReturn';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.api + 'user/';

  constructor(private http: HttpClient) {}

  deleteUser(id: number) {
    return this.http.delete(this.url + id);
  }

  getUser(id: number): Observable<UserToReturn> {
    return this.http
      .get<UserToReturn>(this.url + id, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getMyProfile(): Observable<UserToReturn> {
    return this.http
      .get<UserToReturn>(this.url + 'my-profile', { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getAll(): Observable<UserToReturn[]> {
    return this.http
      .get<UserToReturn[]>(this.url, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getAllUsers(): Observable<UserToReturn[]> {
    return this.http
      .get<UserToReturn[]>(this.url + 'users', { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
}
