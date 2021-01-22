/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccreditationPatternService } from './accreditation-pattern.service';

describe('Service: AccreditationPattern', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccreditationPatternService]
    });
  });

  it('should ...', inject([AccreditationPatternService], (service: AccreditationPatternService) => {
    expect(service).toBeTruthy();
  }));
});
