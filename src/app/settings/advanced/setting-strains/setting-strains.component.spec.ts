import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingStrainsComponent} from './setting-strains.component';

describe('SettingStrainsComponent', () => {
  let component: SettingStrainsComponent;
  let fixture: ComponentFixture<SettingStrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingStrainsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingStrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
