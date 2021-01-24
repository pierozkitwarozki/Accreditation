/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserattachmentService } from './userattachment.service';

describe('Service: Userattachment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserattachmentService]
    });
  });

  it('should ...', inject([UserattachmentService], (service: UserattachmentService) => {
    expect(service).toBeTruthy();
  }));
});
