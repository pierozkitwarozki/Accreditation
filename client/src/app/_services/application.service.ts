import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationToAdd } from '../_models/applicationToAdd';
import { ApplicationToReturn } from '../_models/applicationToReturn';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  url = environment.api + 'application/';

  constructor(private http: HttpClient) {}

  getForUser(id: number): Observable<ApplicationToReturn[]> {
    return this.http
      .get<ApplicationToReturn[]>(this.url + 'for-user/' + id, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getSingle(patternId: number, userId: number): Observable<ApplicationToReturn> {
    return this.http
      .get<ApplicationToReturn>(this.url + 'single/' + patternId + '/' + userId, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }


  getNonApproved(): Observable<ApplicationToReturn[]> {
    return this.http
      .get<ApplicationToReturn[]>(this.url + 'non-approved/', {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  get(id: number): Observable<ApplicationToReturn> {
    return this.http
      .get<ApplicationToReturn>(this.url + id, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  add(model: ApplicationToAdd) {
    return this.http.post(this.url, model);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

  comment(id: number, model: any) {
    return this.http.put(this.url + 'comment/' + id, model);
  }

  approve(id: number) {
    return this.http.put(this.url + 'approve/' + id, {});
  }
}
