import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputDetectorsComponent} from './input-detectors.component';

describe('InputDetectorsComponent', () => {
  let component: InputDetectorsComponent;
  let fixture: ComponentFixture<InputDetectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputDetectorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
