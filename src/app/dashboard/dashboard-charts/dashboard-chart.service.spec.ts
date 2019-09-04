import {TestBed} from '@angular/core/testing';

import {DashboardChartService} from './dashboard-chart.service';

describe('DashboardChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardChartService = TestBed.get(DashboardChartService);
    expect(service).toBeTruthy();
  });
});
