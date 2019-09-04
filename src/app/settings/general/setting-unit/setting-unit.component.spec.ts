import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingUnitComponent} from './setting-unit.component';

describe('SettingUnitComponent', () => {
  let component: SettingUnitComponent;
  let fixture: ComponentFixture<SettingUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingUnitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
