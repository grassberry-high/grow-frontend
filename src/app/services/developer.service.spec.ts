import {TestBed} from '@angular/core/testing';

import {DeveloperService} from './developer.service';

describe('DeveloperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeveloperService = TestBed.get(DeveloperService);
    expect(service).toBeTruthy();
  });
});
