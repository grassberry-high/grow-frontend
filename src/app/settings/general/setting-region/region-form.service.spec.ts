import {TestBed} from '@angular/core/testing';

import {RegionFormService} from './region-form.service';

describe('RegionFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionFormService = TestBed.get(RegionFormService);
    expect(service).toBeTruthy();
  });
});
