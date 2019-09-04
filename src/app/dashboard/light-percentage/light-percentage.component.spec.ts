import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightPercentageComponent} from './light-percentage.component';

describe('LightPercentageComponent', () => {
  let component: LightPercentageComponent;
  let fixture: ComponentFixture<LightPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightPercentageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
