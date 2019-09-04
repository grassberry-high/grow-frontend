import {TestBed} from '@angular/core/testing';

import {FeedbackFormService} from './feedback-form.service';

describe('FeedbackFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackFormService = TestBed.get(FeedbackFormService);
    expect(service).toBeTruthy();
  });
});
