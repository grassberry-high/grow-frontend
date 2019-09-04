import {TestBed} from '@angular/core/testing';

import {StrainsFormService} from './strains-form.service';

describe('StrainsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrainsFormService = TestBed.get(StrainsFormService);
    expect(service).toBeTruthy();
  });
});
