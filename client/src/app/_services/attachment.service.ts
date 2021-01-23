import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attachment } from '../_models/attachment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  url = environment.api + 'attachment/';

  constructor(private http: HttpClient) {}

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

}
