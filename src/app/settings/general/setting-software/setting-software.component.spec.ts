import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingSoftwareComponent} from './setting-software.component';

describe('SettingSoftwareComponent', () => {
  let component: SettingSoftwareComponent;
  let fixture: ComponentFixture<SettingSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSoftwareComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
