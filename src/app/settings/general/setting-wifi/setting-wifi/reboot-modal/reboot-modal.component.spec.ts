import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RebootModalComponent} from './reboot-modal.component';

describe('RebootModalComponent', () => {
  let component: RebootModalComponent;
  let fixture: ComponentFixture<RebootModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RebootModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebootModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
