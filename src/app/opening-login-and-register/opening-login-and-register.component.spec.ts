import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningLoginAndRegisterComponent } from './opening-login-and-register.component';

describe('OpeningLoginAndRegisterComponent', () => {
  let component: OpeningLoginAndRegisterComponent;
  let fixture: ComponentFixture<OpeningLoginAndRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningLoginAndRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningLoginAndRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
