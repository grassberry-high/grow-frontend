import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingWifiComponent} from './setting-wifi.component';

describe('SettingWifiComponent', () => {
  let component: SettingWifiComponent;
  let fixture: ComponentFixture<SettingWifiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingWifiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
