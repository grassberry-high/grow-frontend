import {TestBed} from '@angular/core/testing';

import {SensorFormService} from './sensor-form.service';

describe('SensorFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorFormService = TestBed.get(SensorFormService);
    expect(service).toBeTruthy();
  });
});
