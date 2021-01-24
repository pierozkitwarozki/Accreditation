/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccreditationService } from './accreditation.service';

describe('Service: Accreditation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccreditationService]
    });
  });

  it('should ...', inject([AccreditationService], (service: AccreditationService) => {
    expect(service).toBeTruthy();
  }));
});
