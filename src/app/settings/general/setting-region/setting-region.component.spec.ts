import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingRegionComponent} from './setting-region.component';

describe('SettingRegionComponent', () => {
  let component: SettingRegionComponent;
  let fixture: ComponentFixture<SettingRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingRegionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
