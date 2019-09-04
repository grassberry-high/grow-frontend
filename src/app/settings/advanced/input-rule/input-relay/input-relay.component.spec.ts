import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputRelayComponent} from './input-relay.component';

describe('InputRelayComponent', () => {
  let component: InputRelayComponent;
  let fixture: ComponentFixture<InputRelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputRelayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
