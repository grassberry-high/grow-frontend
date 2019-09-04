import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingFansComponent} from './setting-fans.component';

describe('SettingFansComponent', () => {
  let component: SettingFansComponent;
  let fixture: ComponentFixture<SettingFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingFansComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
