import {TestBed} from '@angular/core/testing';

import {UnitFormService} from './unit-form.service';

describe('UnitFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitFormService = TestBed.get(UnitFormService);
    expect(service).toBeTruthy();
  });
});
