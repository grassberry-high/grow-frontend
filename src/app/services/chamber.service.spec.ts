import {TestBed} from '@angular/core/testing';

import {ChamberService} from './chamber.service';

describe('ChamberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamberService = TestBed.get(ChamberService);
    expect(service).toBeTruthy();
  });
});
