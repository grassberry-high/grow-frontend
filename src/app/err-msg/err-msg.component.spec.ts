import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrMessageComponent} from './err-msg.component';

describe('ErrMessageComponent', () => {
  let component: ErrMessageComponent;
  let fixture: ComponentFixture<ErrMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
