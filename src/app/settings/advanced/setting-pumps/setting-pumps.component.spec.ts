import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingPumpsComponent} from './setting-pumps.component';

describe('SettingPumpsComponent', () => {
  let component: SettingPumpsComponent;
  let fixture: ComponentFixture<SettingPumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingPumpsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
