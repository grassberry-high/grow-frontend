import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingLightsComponent} from './setting-lights.component';

describe('SettingLightsComponent', () => {
  let component: SettingLightsComponent;
  let fixture: ComponentFixture<SettingLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingLightsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
