import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingRulesComponent} from './setting-rules.component';

describe('SettingRulesComponent', () => {
  let component: SettingRulesComponent;
  let fixture: ComponentFixture<SettingRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingRulesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
