import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingResetComponent} from './setting-reset.component';

describe('SettingResetComponent', () => {
  let component: SettingResetComponent;
  let fixture: ComponentFixture<SettingResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingResetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
