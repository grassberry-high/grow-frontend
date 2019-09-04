import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RadioBtnGroupComponent} from './radio-btn-group.component';

describe('RadioBtnGroupComponent', () => {
  let component: RadioBtnGroupComponent;
  let fixture: ComponentFixture<RadioBtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioBtnGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
