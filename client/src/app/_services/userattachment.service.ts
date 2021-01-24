import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserattachmentService {

  url = environment.api + 'userAttachment/';

  constructor(private http: HttpClient) {}

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

}
