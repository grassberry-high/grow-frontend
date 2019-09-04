import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardRelaysComponent} from './dashboard-relays.component';

describe('DashboardRelaysComponent', () => {
  let component: DashboardRelaysComponent;
  let fixture: ComponentFixture<DashboardRelaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRelaysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRelaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
