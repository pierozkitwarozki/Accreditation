import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccreditationToReturn } from '../_models/accreditationToReturn';

@Injectable({
  providedIn: 'root'
})
export class AccreditationService {

  url = environment.api + 'accreditation/'

constructor(private http: HttpClient) { }

getAll(id: number): Observable<AccreditationToReturn[]> {
  return this.http
    .get<AccreditationToReturn[]>(this.url + 'for-user/' + id, {
      observe: 'response',
    })
    .pipe(
      map((response) => {
        return response.body;
      })
    );
}

get(id: number): Observable<AccreditationToReturn> {
  return this.http
    .get<AccreditationToReturn>(this.url + id, { observe: 'response' })
    .pipe(
      map((response) => {
        return response.body;
      })
    );
}

}
