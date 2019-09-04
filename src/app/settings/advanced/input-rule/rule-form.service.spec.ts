import {TestBed} from '@angular/core/testing';

import {RuleFormService} from './rule-form.service';

describe('RuleFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleFormService = TestBed.get(RuleFormService);
    expect(service).toBeTruthy();
  });
});
