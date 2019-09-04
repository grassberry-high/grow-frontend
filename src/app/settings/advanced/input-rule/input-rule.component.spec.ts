import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InputRuleComponent} from './input-rule.component';

describe('InputRuleComponent', () => {
  let component: InputRuleComponent;
  let fixture: ComponentFixture<InputRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputRuleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
