import {TestBed} from '@angular/core/testing';

import {AdvancedFormService} from './advanced-form.service';

describe('AdvancedFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvancedFormService = TestBed.get(AdvancedFormService);
    expect(service).toBeTruthy();
  });
});
