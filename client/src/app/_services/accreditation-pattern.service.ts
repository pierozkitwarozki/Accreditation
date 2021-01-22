import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pattern } from '../_models/pattern';
import { PatternToAdd } from '../_models/patternToAdd';

@Injectable({
  providedIn: 'root',
})
export class AccreditationPatternService {
  url = environment.api + 'accreditationPattern/';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<Pattern> {
    return this.http
      .get<Pattern>(this.url + id, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getAll(): Observable<Pattern[]> {
    return this.http
      .get<Pattern[]>(this.url, { observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  add(pattern: PatternToAdd) {
    return this.http.post(this.url, pattern);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }
}
