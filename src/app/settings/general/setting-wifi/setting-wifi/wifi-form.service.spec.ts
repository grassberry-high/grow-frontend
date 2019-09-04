import {TestBed} from '@angular/core/testing';

import {WifiFormService} from './wifi-form.service';

describe('WifiFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WifiFormService = TestBed.get(WifiFormService);
    expect(service).toBeTruthy();
  });
});
